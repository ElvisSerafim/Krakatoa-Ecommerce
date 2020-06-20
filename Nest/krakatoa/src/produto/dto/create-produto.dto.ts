import { isNotEmpty, Length } from 'class-validator';

export class CreateProdutoDto {
  @isNotEmpty()
  nome: string;
  @isNotEmpty()
  preco: number;
  @Length(10, 20)
  tipo: string;

  @isNotEmpty()
  tamanho: string[];

  @isNotEmpty()
  promocao: boolean;

  @isNotEmpty()
  precoPromo: boolean;

  @isNotEmpty()
  categoria: string;

  @isNotEmpty()
  cores: string[];

  @isNotEmpty()
  descricao: string;

  @isNotEmpty()
  vendas: number;

  @isNotEmpty()
  quantidade: number;
}
