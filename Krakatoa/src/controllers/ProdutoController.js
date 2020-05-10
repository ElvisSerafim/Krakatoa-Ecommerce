/* eslint-disable consistent-return */
const Produto = require('../models/Produto');

module.exports = {
  async Store(req, res) {
    const {
      nome,
      preco,
      colecao,
      tipo,
      tamanho,
      promocao,
      promopreco,
      quantidade,
      vendas,
      descricao,
    } = req.body;
    try {
      let produto = await Produto.findOne({ nome });
      if (!produto) {
        produto = await Produto.create({
          nome,
          preco,
          colecao,
          tipo,
          tamanho,
          promocao,
          promopreco,
          quantidade,
          vendas,
          descricao,
        });
        return res.json(produto);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async Update(req, res) {
    const {
      nome,
      preco,
      colecao,
      tipo,
      tamanho,
      promocao,
      promopreco,
      quantidade,
      vendas,
      descricao,
    } = req.body;
    const { id } = req.params.id;
    try {
      const produto = await Produto.findById(id);
      if (!produto) throw new Error('Produto não encontrado');
      produto.nome = typeof nome === 'string'
          && nome.trim().length > 0
          && nome !== produto.nome
        ? nome
        : produto.nome;
      produto.preco = typeof preco === 'number'
          && preco > 0
          && preco !== produto.preco
        ? preco
        : produto.preco;
      produto.colecao = typeof colecao === 'string'
          && colecao.trim().length > 0
          && colecao !== produto.colecao
        ? colecao
        : produto.colecao;
      produto.tamanho = typeof tamanho === 'string'
          && tamanho.trim().length > 0
          && tamanho !== produto.tamanho
        ? tamanho
        : produto.tamanho;
      produto.tipo = typeof tipo === 'string'
          && tipo.trim().length > 0
          && tipo !== produto.tipo
        ? tipo.toLowerCase()
        : produto.tipo;
      produto.promocao = !!(typeof promocao === 'boolean'
          && promocao === true);
      produto.promopreco = typeof promopreco === 'number'
          && promopreco > 0
          && promopreco !== produto.promopreco
        ? promopreco
        : produto.promopreco;
      produto.quantidade = typeof quantidade === 'number'
          && quantidade > 0
          && quantidade !== produto.quantidade
        ? quantidade
        : produto.quantidade;
      produto.vendas = typeof vendas === 'number'
          && vendas >= 0
          && vendas !== produto.vendas
        ? vendas
        : produto.vendas;
      produto.descricao = typeof descricao === 'string'
          && descricao.trim().length > 0
          && descricao !== produto.descricao
        ? descricao
        : produto.descricao;
      const result = await produto.save();
      if (result) {
        return res.json(result).sendStatus(200);
      }
      throw new Error('Error a Salvar');
    } catch (error) {
      res.status(401).send(error);
    }
  },
  async Delete(req, res) {
    try {
      const { id } = req.params.id;
      const result = await Produto.deleteOne({ id });
      if (result) return res.sendStatus(200);
      throw new Error('Não foi possivel encontrar o usuario');
    } catch (error) {
      return res.send('Erro em apagar usuario').status(400);
    }
  },
  async Index(req, res) {
    try {
      const produtos = await Produto.find();
      if (produtos) {
        return res.json(produtos);
      }
      throw new Error('Não foi possivel encontrar produtos');
    } catch (error) {
      res.send('Não foi possivel encontrar produtos').status(500);
    }
  },
  async IndexQuery(req, res) {
    try {
      const { tipo, chave } = req.body;
      const produtos = await Produto.find({ tipo });
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
      if (produtos.length !== 0) return res.json(produtos).status(200);
      throw new Error('Categoria invalida');
    } catch (error) {
      res.status(500).send('Não foi possivel encontrar produtos');
    }
  },
};
