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
exports.ProdutoService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const produto_schema_1 = require("./schemas/produto.schema");
const checker_1 = require("../utils/checker");
let ProdutoService = class ProdutoService {
    constructor(produtoModel) {
        this.produtoModel = produtoModel;
    }
    async CreateProduto(createProdutoDto) {
        const { nome } = createProdutoDto;
        const check = await this.produtoModel.findOne({ nome });
        if (!check) {
            const createdProduto = await new this.produtoModel(createProdutoDto);
            createdProduto.tamanho.forEach((tamanho, i) => {
                if (tamanho !== 'Único') {
                    createdProduto.tamanho[i] = tamanho.toUpperCase();
                }
            });
            createdProduto.quantidade;
            if (createdProduto) {
                return createdProduto.save();
            }
            throw new Error('Não foi possivel Criar Produto');
        }
        throw new common_1.ConflictException('Produto com esse nome já existe');
    }
    async UpdateProduto(updateProdutoDto, id) {
        const produto = await this.produtoModel.findById(id);
        if (!produto) {
            throw new Error('Não foi possivel achar o produto');
        }
        const { nome, categoria, descricao, tamanho, imagens, preco, tipo, } = updateProdutoDto;
        produto.nome = checker_1.checkString(nome, produto.nome) ? nome : produto.nome;
        produto.categoria = checker_1.checkString(categoria, produto.categoria)
            ? categoria
            : produto.categoria;
        produto.descricao = checker_1.checkString(descricao, produto.descricao)
            ? descricao
            : produto.descricao;
        produto.tipo = checker_1.checkString(tipo, produto.tipo) ? tipo : produto.tipo;
        produto.preco = checker_1.checkNumber(preco, produto.preco) ? preco : produto.preco;
        produto.tamanho = checker_1.checkArray(tamanho, produto.tamanho)
            ? tamanho
            : produto.tamanho;
        produto.imagens = checker_1.checkArray(imagens, produto.imagens)
            ? imagens
            : produto.imagens;
        return produto.save();
    }
    async DeleteProduto(id) {
        const produto = await this.produtoModel.findById(id);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        const operation = await this.produtoModel.deleteOne({ _id: id });
        if (!operation) {
            throw new Error('Não foi possivel apagar produto');
        }
    }
    async GetAllProdutos() {
        const Produtos = await this.produtoModel
            .aggregate([
            {
                $project: {
                    cores: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0,
                    vendas: 0,
                },
            },
        ])
            .exec();
        return Produtos;
    }
};
ProdutoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(produto_schema_1.Produto.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProdutoService);
exports.ProdutoService = ProdutoService;
//# sourceMappingURL=produto.service.js.map