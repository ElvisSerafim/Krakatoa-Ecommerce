import { Model, SchemaTypes } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PedidoDto } from './dto/pedido.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pedido } from '../pedido/schemas/pedido.schema';
import { User } from '../user/schemas/user.schema';
import { Produto } from '../produto/schemas/produto.schema';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name)
    @InjectModel(User.name)
    @InjectModel(Produto.name)
    private pedidoModel: Model<Pedido>,
    private userModel: Model<User>,
    private produtoModel: Model<Produto>,
  ) {}
  async getPedidos(userId: string): Promise<any> {
    const User = await this.userModel.findById(userId);
    if (User) {
      const Pedidos = User.pedidos;
      if (Pedidos) {
        return Pedidos;
      }
    }
    throw new Error('Usuario não encontrado');
  }
  async createPedido(pedidoDto: PedidoDto, userId: string): Promise<Pedido> {
    const Pedido = await new this.pedidoModel(pedidoDto);
    const { produtos } = pedidoDto;
    while (produtos.length > 0) {
      const produtoArray = produtos.pop();
      const {
        quantidadePedido,
        tamanhoEscolhido,
        corEscolhida,
        id,
      } = produtoArray;
      const produto = await this.produtoModel.findById(id);
      const produto_id = <typeof SchemaTypes.ObjectId>produto.id;
      const produtoFinal = {
        produto: produto_id,
        quantidadePedido,
        tamanhoEscolhido,
        corEscolhida,
      };
      Pedido.produtos.push(produtoFinal);
    }
    const user = await this.userModel.findById(userId);
    user.pedidos.push(Pedido);
    const UserSalvo = await user.save();
    const PedidoSalvo = await Pedido.save();
    if (UserSalvo && PedidoSalvo) {
      return Pedido;
    }
    throw new Error('Não foi possivel realizar pedido');
  } /*
  updatePedido(PedidoDto: PedidoDto, id: string): PedidoEntity {
    return PedidoEntity;
  }
  (PedidoDto: PedidoDto, id: string): PedidoEntity {
    return PedidoEntity;
  }  */
}
