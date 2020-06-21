import { isNotEmpty, IsNotEmpty } from 'class-validator';

export class QueryProdutoDto {
  @IsNotEmpty()
  tipo: string;
  @IsNotEmpty()
  chave: string;
}
