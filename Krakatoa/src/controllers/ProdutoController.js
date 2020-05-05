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
    } = req.body;
    const { id } = req.params.id;
    try {
      const produto = await Produto.findById(id);
      if (!produto) throw new Error('Produto não encontrado');
      if (
        nome !== produto.nome
        || preco !== produto.preco
        || colecao !== produto.colecao
        || tipo !== produto.tipo
        || tamanho !== produto.tamanho
        || promocao !== produto.promocao
        || promopreco !== produto.promopreco
        || quantidade !== produto.quantidade
      ) {
        produto.nome = nome;
        produto.preco = preco;
        produto.colecao = colecao;
        produto.tipo = tipo.toLowerCase();
        produto.tamanho = tamanho;
        produto.promocao = promocao;
        produto.promopreco = promopreco;
        produto.quantidade = quantidade;
        produto.vendas = vendas;
      }
      const result = await produto.save();
      return res.json(result).sendStatus(200);
    } catch (error) {
      res.status(401).send(error);
    }
  },
  async Delete(req, res) {
    try {
      const { id } = req.params.id;
      const result = await Produto.deleteOne({ id });
      if (!result) throw new Error('Não foi possivel encontrar o usuario');
      return res.sendStatus(200);
    } catch (error) {
      return res.send('Erro em apagar usuario').status(404);
    }
  },
  async Index(req, res) {
    try {
      const produtos = await Produto.find();
      return res.json(produtos);
    } catch (error) {
      res.send('Não foi possivel encontrar produtos').status(500);
    }
  },
  async IndexQuery(req, res) {
    try {
      const { tipo, chave } = req.body;
      const produtos = await Produto.find({ tipo });
      if (chave === 'menorP') {
        produtos.sort({ preco: -1 });
      }
      if (chave === 'maiorP') {
        produtos.sort({ preco: 1 });
      }
      if (chave === 'maiorV') {
        produtos.sort({ vendas: -1 });
      }
      if(produtos.length !== 0) return res.json(produtos).status(200);
      throw new Error ('Categoria invalida');
    } catch (error) {
      res.status(500).send('Não foi possivel encontrar produtos');
    }
  },
};
