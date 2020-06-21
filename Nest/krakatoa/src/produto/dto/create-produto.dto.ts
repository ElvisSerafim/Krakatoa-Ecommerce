import { IsNotEmpty, Length } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  nome: string;
  @IsNotEmpty()
  preco: number;

  tipo: string;

  @IsNotEmpty()
  tamanho: string[];

  promocao: boolean;

  precoPromo: number;

  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  cores: string[];

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  vendas: number;

  @IsNotEmpty()
  quantidade: number;
}
