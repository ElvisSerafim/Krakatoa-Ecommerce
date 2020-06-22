export class UpdateProdutoDto {
  nome: string;
  preco: number;
  tipo: string;
  tamanho: string[];
  imagens: string[];
  promocao: boolean;
  precoPromo: number;
  categoria: string;
  cores: string[];
  descricao: string;
  vendas: number;
  quantidade: number;
}
