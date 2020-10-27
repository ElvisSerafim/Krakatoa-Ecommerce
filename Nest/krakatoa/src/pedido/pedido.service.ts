import { Model, mongo, Types } from 'mongoose';
import {
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PedidoDto, produto } from './dto/pedido.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Produto } from '../produto/schemas/produto.schema';
import { Pedido } from './schemas/pedido.schema';
import { Quantidade } from '../utils/types';
import produce from 'immer';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
const mailjet = require('node-mailjet').connect(
  '9b4c4b2356385d8f352b67ad0813b60c',
  '5fa302479fd049e12e0a763f9973aa07',
);
@Injectable()
export class PedidoService {
  private logger = new Logger();
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
  ) { }

  async getPedidos(user: User): Promise<Pedido[]> {
    const Pedidos = await this.pedidoModel.find({ user: user._id });

    return Pedidos;
  }

  subtract(ProdutoAchado: Produto, Produto: produto): Quantidade {
    const aux = produce(ProdutoAchado.quantidade, draftState => {
      for (const tamanho in draftState) {
        if (Produto.tamanhoEscolhido === tamanho) {
          draftState[tamanho] = draftState[tamanho] - Produto.quantidadePedido;
        }
      }
    })
    return aux;
  }

  async returnProduto(id: Types.ObjectId): Promise<Produto> {
    const Produto = await this.produtoModel.findById(id);

    return Produto;
  }

  async createPedido(pedidoDto: PedidoDto, user: User): Promise<Pedido> {
    pedidoDto.produtos.forEach(produto => {
      produto.Produto_id = mongo.ObjectID.createFromHexString(
        produto.produto_id,
      );
      produto.produto_id = undefined;
    });
    try {
      for (const [, produto] of pedidoDto.produtos.entries()) {
        const Found = await this.produtoModel.findById(produto.Produto_id)
        Found.vendas = Found.vendas += 1;
        for (const tamanho in Found.quantidade) {
          if ((Found.quantidade[tamanho] === 0 || Found.quantidade[tamanho] - produto.quantidadePedido < 0) && produto.tamanhoEscolhido === tamanho) {
            throw new Error("Não tem unidades no estoque");
          }
        }
        Found.quantidade = this.subtract(Found, produto)
        await Found.save()
      };

    } catch (error) {
      throw new ConflictException("Não tem unidades no estoque");
    }

    const PedidoRealizado = new this.pedidoModel(pedidoDto);


    if (!PedidoRealizado) {
      throw new InternalServerErrorException(
        'Não foi possivel Criar um Pedido',
      );
    }


    user.pedidos.push(PedidoRealizado._id);
    PedidoRealizado.user = user._id;
    const UserSalvo = await user.save();
    const PedidoSalvo = await PedidoRealizado.save();
    if (UserSalvo && PedidoSalvo) {
      const { endereco } = user;
      const ProdutosEmail: string[] = [];
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
}

