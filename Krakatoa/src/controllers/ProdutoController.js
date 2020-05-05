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
  async IndexQuerry(req, res) {
    try {
      const { tipo, chave } = req.body;
      const produtos = await Produto.find({ tipo });
      if (chave === 'menorP') {
        produtos.sort(function(a, b) {
            if(a.preco > b.preco){
               return 1;
            }else if(a.preco < b.preco){
              return -1;
            }
            return 0;
        })
      }
      if (chave === 'maiorP') {
        produtos.sort(function(a, b) {
          if(a.preco < b.preco){
             return 1;
          }else if(a.preco > b.preco){
            return -1;
          }
          return 0;
        });
      }
      if (chave === 'maiorV') {
        produtos.sort(function(a, b) {
          if(a.vendas < b.vendas){
             return 1;
          }else if(a.vendas > b.vendas){
            return -1;
          }
          return 0;
        });
      }
      return res.json(produtos);
    } catch (error) {
      res.send('Não foi possivel encontrar produtos').status(500);
    }
  },
};
