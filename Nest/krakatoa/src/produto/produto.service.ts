import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Produto } from './schemas/produto.schema';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Tamanho } from '../utils/types';
import { checkArray, checkNumber, checkString } from '../utils/checker';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel(Produto.name) private readonly produtoModel: Model<Produto>,
  ) { }
  async CreateProduto(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const { nome } = createProdutoDto;
    const check = await this.produtoModel.findOne({ nome });
    if (!check) {
      const createdProduto = await new this.produtoModel(createProdutoDto);
      createdProduto.tamanho.forEach((tamanho, i) => {
        if (tamanho !== 'Único') {
          createdProduto.tamanho[i] = tamanho.toUpperCase() as Tamanho;
        }
      })
      createdProduto.quantidade;
      if (createdProduto) {
        return createdProduto.save();
      }
      throw new Error('Não foi possivel Criar Produto');
    }
    throw new ConflictException('Produto com esse nome já existe');
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
      descricao,
      tamanho,
      imagens,
      preco,
      tipo,
    } = updateProdutoDto;

    produto.nome = checkString(nome, produto.nome) ? nome : produto.nome;

    produto.categoria = checkString(categoria, produto.categoria)
      ? categoria
      : produto.categoria;

    produto.descricao = checkString(descricao, produto.descricao)
      ? descricao
      : produto.descricao;

    produto.tipo = checkString(tipo, produto.tipo) ? tipo : produto.tipo;

    produto.preco = checkNumber(preco, produto.preco) ? preco : produto.preco;

    produto.tamanho = checkArray(tamanho, produto.tamanho)
      ? tamanho
      : produto.tamanho;

    produto.imagens = checkArray(imagens, produto.imagens)
      ? imagens
      : produto.imagens;

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
  async GetAllProdutos(): Promise<Produto[]> {
    const Produtos: Produto[] = await this.produtoModel
      .aggregate([
        {
          $project: {
            cores: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            vendas: 0,
          },
        },
      ])
      .exec();

    return Produtos;
  }
}
/*

quantidade = {
  G:2;
  M:2;
  GG:0;
  P:0;
}

*/