import { Document, Schema } from 'mongoose';
export declare class Pedido extends Document {
    precoTotal: number;
    frete: number;
    user: Schema.Types.ObjectId;
    produtos: Record<string, any>;
    metodo: string;
    idPagamento: string;
    idPedido: string;
}
export declare const PedidoSchema: Schema<any>;
