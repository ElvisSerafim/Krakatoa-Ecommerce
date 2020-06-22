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
  async UpdateProduto(
    updateProdutoDto: UpdateProdutoDto,
    id: string,
  ): Promise<Produto> {
    const produto = await this.produtoModel.findById(id);
    if (!produto) {
      throw new Error('Não foi possivel achar o produto');
    }
    const {
      nome,
      categoria,
      cores,
      descricao,
      preco,
      precoPromo,
      promocao,
      quantidade,
      tamanho,
      imagens,
      tipo,
      vendas,
    } = updateProdutoDto;
    produto.nome =
      typeof nome === 'string' && nome.length > 0 && produto.nome !== nome
        ? nome
        : produto.nome;

    produto.categoria =
      typeof categoria !== 'undefined' &&
      categoria.length > 0 &&
      produto.categoria !== categoria
        ? categoria
        : produto.categoria;

    produto.cores =
      typeof cores !== 'undefined' &&
      cores.length > 0 &&
      produto.cores !== cores
        ? cores
        : produto.cores;

    produto.descricao =
      typeof descricao !== 'undefined' &&
      descricao.length > 0 &&
      produto.descricao !== descricao
        ? descricao
        : produto.descricao;

    produto.preco =
      typeof preco === 'number' && preco > 0 && produto.preco !== preco
        ? preco
        : produto.preco;

    produto.vendas =
      typeof preco === 'number' && preco > 0 && produto.vendas !== vendas
        ? vendas
        : produto.vendas;

    produto.promocao = typeof promocao === 'boolean' && promocao === true;

    produto.precoPromo =
      typeof quantidade === 'number' &&
      precoPromo > 0 &&
      produto.precoPromo !== precoPromo
        ? precoPromo
        : produto.precoPromo;

    produto.quantidade =
      typeof quantidade === 'number' &&
      quantidade > 0 &&
      produto.quantidade !== quantidade
        ? quantidade
        : produto.quantidade;

    produto.tamanho =
      typeof tamanho !== 'undefined' &&
      tamanho.length > 0 &&
      produto.tamanho !== tamanho
        ? tamanho
        : produto.tamanho;

    produto.imagens =
      typeof imagens !== 'undefined' &&
      imagens.length > 0 &&
      produto.imagens !== imagens
        ? imagens
        : produto.imagens;

    produto.tipo =
      typeof tipo === 'string' && tipo.length > 0 && produto.tipo !== tipo
        ? tipo
        : produto.tipo;

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
