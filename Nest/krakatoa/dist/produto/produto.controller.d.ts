import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './schemas/produto.schema';
export declare class ProdutoController {
    private produtoService;
    constructor(produtoService: ProdutoService);
    CreateProduto(createProdutoDto: CreateProdutoDto): Promise<Produto>;
    UpdateProduto(updateProdutoDto: UpdateProdutoDto, id: string): Promise<Produto>;
    DeleteProduto(id: string): Promise<void>;
    GetAllProdutos(): Promise<Produto[]>;
}
