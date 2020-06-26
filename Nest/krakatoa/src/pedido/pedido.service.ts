import { Model, mongo } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PedidoDto } from './dto/pedido.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Produto } from '../produto/schemas/produto.schema';
import { Pedido } from './schemas/pedido.schema';
import { exception } from 'console';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
  ) {}
  async getPedidos(userId: string): Promise<Pedido[]> {
    const User = await this.userModel.findById(userId);
    if (User) {
      const Pedidos = User.pedidos;
      if (Pedidos) {
        const ResultadosPedidos = Pedidos.map(
          async pedido => await this.pedidoModel.findById(pedido),
        );
        console.log(ResultadosPedidos);
        /* return ResultadosPedidos; */
      }
      throw new Error('Não há Pedidos');
    }
    throw new Error('Usuario não encontrado');
  } /*
  updatePedido(PedidoDto: PedidoDto, id: string): PedidoEntity {
    return PedidoEntity;
  }
  (PedidoDto: PedidoDto, id: string): PedidoEntity {
    return PedidoEntity;
  }  */
  /* Create Pagamento */
  async createPedido(pedidoDto: PedidoDto, userId: string): Promise<Pedido> {
    pedidoDto.produtos.forEach(produto => {
      produto.Produto_id = mongo.ObjectID.createFromHexString(
        produto.produto_id,
      );
      produto.produto_id = undefined;
    });

    const Pedido = new this.pedidoModel(pedidoDto);

    const user = await this.userModel.findById(userId);
    if (user) {
      user.pedidos.push(Pedido._id);
      const UserSalvo = await user.save();
      const PedidoSalvo = await Pedido.save();
      if (UserSalvo && PedidoSalvo) {
        return Pedido;
      }
    }
    throw new Error('Não foi possivel realizar pedido');
  }
}
