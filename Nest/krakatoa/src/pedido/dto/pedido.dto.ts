import * as mongoose from 'mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Tamanho } from '../../utils/types';

export interface produto {
  quantidadePedido: number;
  tamanhoEscolhido: Tamanho;
  nomeProduto: string;
  produto_id: string;
  Produto_id: mongoose.Types.ObjectId;
}
export class PedidoDto {
  @IsNumber()
  @IsNotEmpty()
  precoTotal: number;
  @IsNumber()
  @IsNotEmpty()
  frete: number;
  @IsString()
  @IsNotEmpty()
  data: string;
  @IsString()
  @IsNotEmpty()
  idPagamento: string;
  @IsString()
  @IsNotEmpty()
  idPedido: string;
  produtos: produto[];
}
