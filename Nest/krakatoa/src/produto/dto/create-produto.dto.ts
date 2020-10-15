import { IsNotEmpty } from 'class-validator';
import { Categoria, Tipo, Tamanho, Quantidade } from '../../utils/types';

export class CreateProdutoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  preco: number;

  @IsNotEmpty()
  tipo: Tipo;

  @IsNotEmpty()
  tamanho: Tamanho[];

  @IsNotEmpty()
  imagens: string[];

  @IsNotEmpty()
  quantidade: Quantidade;

  @IsNotEmpty()
  categoria: Categoria;

  @IsNotEmpty()
  descricao: string;
}
