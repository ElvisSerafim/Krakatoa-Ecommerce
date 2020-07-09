import { Model, mongo } from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PedidoDto } from './dto/pedido.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Produto } from '../produto/schemas/produto.schema';
import { Pedido } from './schemas/pedido.schema';

@Injectable()
export class PedidoService {
  private logger = new Logger();
  constructor(
    @InjectModel(Pedido.name) private pedidoModel: Model<Pedido>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
  ) {}

  async getPedidos(userId: string): Promise<Pedido[]> {
    const User = await this.userModel.findById(userId);
    if (User) {
      const Pedidos = await this.pedidoModel.find({ user: User._id });

      return Pedidos;
    }
    throw new Error('Usuario não encontrado');
  } 

  async createPedido(pedidoDto: PedidoDto, userId: string): Promise<Pedido> {
    try {
      pedidoDto.produtos.forEach(produto => {
        produto.Produto_id = mongo.ObjectID.createFromHexString(
          produto.produto_id,
        );
        produto.produto_id = undefined;
      });

      const Pedido = new this.pedidoModel(pedidoDto);

      if (!Pedido) {
        throw new InternalServerErrorException(
          'Não foi possivel Criar um Pedido',
        );
      }

      const user = await this.userModel.findById(userId);

      if (user) {
        user.pedidos.push(Pedido._id);
        Pedido.user = user._id;
        const UserSalvo = await user.save();
        const PedidoSalvo = await Pedido.save();
        if (UserSalvo && PedidoSalvo) {
          return Pedido;
        }
      }
    } catch (error) {
      this.logger.log(error);
      if (error.kind === 'ObjectId') {
        throw new BadRequestException('Não foi possivel achar o Usuario');
      }
      throw new Error('Não foi possivel criar um pedido');
    }
  }
}