import { Categoria, Tipo, Tamanho } from '../../utils/types';
export declare class UpdateProdutoDto {
    nome?: string;
    preco?: number;
    tipo?: Tipo;
    tamanho?: Tamanho[];
    imagens?: string[];
    categoria?: Categoria;
    descricao?: string;
}
