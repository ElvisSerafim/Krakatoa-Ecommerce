import * as mongoose from 'mongoose';
import { Tamanho } from '../../utils/types';
export interface produto {
    quantidadePedido: number;
    tamanhoEscolhido: Tamanho;
    nomeProduto: string;
    produto_id: string;
    Produto_id: mongoose.Types.ObjectId;
}
export declare class PedidoDto {
    precoTotal: number;
    frete: number;
    data: string;
    idPagamento: string;
    idPedido: string;
    produtos: produto[];
}
