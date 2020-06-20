import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Produto } from './schemas/produto.schema';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { QueryProdutoDto } from './dto/query-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel(Produto.name) private produtoModel: Model<Produto>,
  ) {}
  async CreateProduto(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const { nome } = createProdutoDto;
    const check = await this.produtoModel.findOne({ nome });
    if (!check) {
      const createdProduto = await new this.produtoModel(createProdutoDto);
      if (createdProduto) {
        return createdProduto.save();
      }
      throw new Error('Não foi possivel Criar Produto');
    }
    throw new Error('Produto com esse nome já existe');
  }
  /* TODO */
  async UpdateProduto(
    updateProdutoDto: UpdateProdutoDto,
    id: string,
  ): Promise<Produto> {
    const produto = await this.produtoModel.findById(id);
    if (!produto) {
      throw new Error('Não foi possivel achar o produto');
    }
    return produto.save();
  }
  async DeleteProduto(id: string): Promise<void> {
    const produto = await this.produtoModel.findById(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    const operation = await this.produtoModel.deleteOne({ _id: id });
    if (!operation) {
      throw new Error('Não foi possivel apagar produto');
    }
  }
  GetAllProdutos(): Promise<Produto[]> {
    return this.produtoModel.find().exec();
  }
  async GetProdutoQuery(queryProdutoDto: QueryProdutoDto): Promise<Produto[]> {
    const { tipo, chave } = queryProdutoDto;
    const produtos = await this.produtoModel.find({ tipo });
    if (chave === 'menorP') {
      produtos.sort((a, b) => {
        if (a.preco > b.preco) return 1;
        if (a.preco < b.preco) return -1;
        return 0;
      });
    }
    if (chave === 'maiorP') {
      produtos.sort((a, b) => {
        if (a.preco < b.preco) return 1;
        if (a.preco > b.preco) return -1;
        return 0;
      });
    }
    if (chave === 'maiorV') {
      produtos.sort((a, b) => {
        if (a.vendas < b.vendas) return 1;
        if (a.vendas > b.vendas) return -1;
        return 0;
      });
    }
    if (produtos.length !== 0) return produtos;
    throw new Error('Não foi possivel encontrar Produtos');
  }
}
