import { IsNotEmpty, Length } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  nome: string;
  
  @IsNotEmpty()
  preco: number;
  
  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  tamanho: string[];

  @IsNotEmpty()
  imagens: string[];

  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  descricao: string;
}
