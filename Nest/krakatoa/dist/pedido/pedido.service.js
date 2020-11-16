"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const produto_schema_1 = require("../produto/schemas/produto.schema");
const pedido_schema_1 = require("./schemas/pedido.schema");
const immer_1 = require("immer");
const internal_server_error_exception_1 = require("@nestjs/common/exceptions/internal-server-error.exception");
const mailjet = require('node-mailjet').connect('9b4c4b2356385d8f352b67ad0813b60c', '5fa302479fd049e12e0a763f9973aa07');
let PedidoService = class PedidoService {
    constructor(pedidoModel, userModel, produtoModel) {
        this.pedidoModel = pedidoModel;
        this.userModel = userModel;
        this.produtoModel = produtoModel;
        this.logger = new common_1.Logger();
    }
    async getPedidos(user) {
        const Pedidos = await this.pedidoModel.find({ user: user._id });
        return Pedidos;
    }
    subtract(ProdutoAchado, Produto) {
        const aux = immer_1.default(ProdutoAchado.quantidade, draftState => {
            for (const tamanho in draftState) {
                if (Produto.tamanhoEscolhido === tamanho) {
                    draftState[tamanho] = draftState[tamanho] - Produto.quantidadePedido;
                }
            }
        });
        return aux;
    }
    async returnProduto(id) {
        const Produto = await this.produtoModel.findById(id);
        return Produto;
    }
    async createPedido(pedidoDto, user) {
        pedidoDto.produtos.forEach(produto => {
            produto.Produto_id = mongoose_1.mongo.ObjectID.createFromHexString(produto.produto_id);
            produto.produto_id = undefined;
        });
        try {
            for (const [, produto] of pedidoDto.produtos.entries()) {
                const Found = await this.produtoModel.findById(produto.Produto_id);
                Found.vendas = Found.vendas += 1;
                for (const tamanho in Found.quantidade) {
                    if ((Found.quantidade[tamanho] === 0 || Found.quantidade[tamanho] - produto.quantidadePedido < 0) && produto.tamanhoEscolhido === tamanho) {
                        throw new Error("Não tem unidades no estoque");
                    }
                }
                Found.quantidade = this.subtract(Found, produto);
                await Found.save();
            }
            ;
        }
        catch (error) {
            throw new common_1.ConflictException("Não tem unidades no estoque");
        }
        const PedidoRealizado = new this.pedidoModel(pedidoDto);
        if (!PedidoRealizado) {
            throw new internal_server_error_exception_1.InternalServerErrorException('Não foi possivel Criar um Pedido');
        }
        user.pedidos.push(PedidoRealizado._id);
        PedidoRealizado.user = user._id;
        const UserSalvo = await user.save();
        const PedidoSalvo = await PedidoRealizado.save();
        if (UserSalvo && PedidoSalvo) {
            const { endereco } = user;
            const ProdutosEmail = [];
            pedidoDto.produtos.forEach((produto, i) => {
                ProdutosEmail[i] = `
    Numero: ${i + 1}
    Nome: ${produto.nomeProduto}
    Quantidade: ${produto.quantidadePedido}
    Tamanho: ${produto.tamanhoEscolhido}
    `;
            });
            const request = mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: 'confirmacao@testekrakatoa.tk',
                            Name: 'Krakatoa',
                        },
                        To: [
                            {
                                Email: user.email,
                                Name: user.nome,
                            },
                            {
                                Email: 'lubinha2@hotmail.com',
                                Name: 'Luciana',
                            },
                        ],
                        TemplateID: 1602088,
                        TemplateLanguage: true,
                        Subject: 'Confirmação de compra',
                        Variables: {
                            Rua: endereco.rua,
                            Cidade: endereco.cidade,
                            Bairro: endereco.bairro,
                            Numero: endereco.numero,
                            CEP: endereco.cep,
                            Estado: endereco.estado,
                            Complemento: endereco.complemento,
                            Preco: pedidoDto.precoTotal,
                            Frete: pedidoDto.frete,
                            Username: user.nome,
                            CPF: user.cpf,
                            Email: user.email,
                            Telefone: user.telefone,
                            Produtos: `${ProdutosEmail}`,
                        },
                    },
                ],
            });
            request
                .then(result => {
                console.log(result.body);
            })
                .catch(err => {
                console.log(err.statusCode);
            });
            return PedidoRealizado;
        }
    }
};
PedidoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(pedido_schema_1.Pedido.name)),
    __param(1, mongoose_2.InjectModel(user_schema_1.User.name)),
    __param(2, mongoose_2.InjectModel(produto_schema_1.Produto.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], PedidoService);
exports.PedidoService = PedidoService;
//# sourceMappingURL=pedido.service.js.map