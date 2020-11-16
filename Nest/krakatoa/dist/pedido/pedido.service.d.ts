import { Model, Types } from 'mongoose';
import { PedidoDto, produto } from './dto/pedido.dto';
import { User } from '../user/schemas/user.schema';
import { Produto } from '../produto/schemas/produto.schema';
import { Pedido } from './schemas/pedido.schema';
import { Quantidade } from '../utils/types';
export declare class PedidoService {
    private pedidoModel;
    private userModel;
    private produtoModel;
    private logger;
    constructor(pedidoModel: Model<Pedido>, userModel: Model<User>, produtoModel: Model<Produto>);
    getPedidos(user: User): Promise<Pedido[]>;
    subtract(ProdutoAchado: Produto, Produto: produto): Quantidade;
    returnProduto(id: Types.ObjectId): Promise<Produto>;
    createPedido(pedidoDto: PedidoDto, user: User): Promise<Pedido>;
}
