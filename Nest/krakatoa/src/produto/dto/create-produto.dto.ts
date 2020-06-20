export class CreateProdutoDto {
  nome: string;
  preco: number;
  tipo: string;
  tamanho: string[];
  promocao: boolean;
  precoPromo: boolean;
  categoria: string;
  cores: string[];
  descricao: string;
  vendas: number;
  quantidade: number;
}
