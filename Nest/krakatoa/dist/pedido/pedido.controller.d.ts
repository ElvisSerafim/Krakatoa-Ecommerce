import { PedidoService } from './pedido.service';
import { PedidoDto } from './dto/pedido.dto';
import { Pedido } from './schemas/pedido.schema';
import { User } from '../user/schemas/user.schema';
export declare class PedidoController {
    private pedidoService;
    constructor(pedidoService: PedidoService);
    CreatePedido(user: User, pedidoDto: PedidoDto): Promise<any>;
    GetPedidos(user: User): Promise<Pedido[]>;
}
