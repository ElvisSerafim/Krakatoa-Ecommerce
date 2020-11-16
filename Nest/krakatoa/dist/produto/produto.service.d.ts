import { Model } from 'mongoose';
import { Produto } from './schemas/produto.schema';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
export declare class ProdutoService {
    private readonly produtoModel;
    constructor(produtoModel: Model<Produto>);
    CreateProduto(createProdutoDto: CreateProdutoDto): Promise<Produto>;
    UpdateProduto(updateProdutoDto: UpdateProdutoDto, id: string): Promise<Produto>;
    DeleteProduto(id: string): Promise<void>;
    GetAllProdutos(): Promise<Produto[]>;
}
