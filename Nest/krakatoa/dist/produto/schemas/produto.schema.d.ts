import { Document } from 'mongoose';
import { Categoria, Tipo, Tamanho, Quantidade } from '../../utils/types';
export declare class Produto extends Document {
    nome: string;
    preco: number;
    tipo: Tipo;
    tamanho: Tamanho[];
    promocao: boolean;
    imagens: string[];
    precoPromo: number;
    categoria: Categoria;
    descricao: string;
    vendas: number;
    quantidade: Quantidade;
}
export declare const ProdutoSchema: import("mongoose").Schema<any>;
