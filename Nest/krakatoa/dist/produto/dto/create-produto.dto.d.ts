import { Categoria, Tipo, Tamanho, Quantidade } from '../../utils/types';
export declare class CreateProdutoDto {
    nome: string;
    preco: number;
    tipo: Tipo;
    tamanho: Tamanho[];
    imagens: string[];
    quantidade: Quantidade;
    categoria: Categoria;
    descricao: string;
}
