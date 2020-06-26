import * as mongoose from 'mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface produto {
  quantidadePedido: number;
  tamanhoEscolhido: string;
  corEscolhida: string;
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
  produtos: produto[];
  pagamento: {
    metodo: string;
    frete: number;
  };
}
