import { ProdutoEntity } from '../../pedido/pedido.entity';

export class PagamentoDto {
  data: Date;
  valor: number;
  produto: ProdutoEntity[];
  metodo: string;
  user: UserEntity[];
}
