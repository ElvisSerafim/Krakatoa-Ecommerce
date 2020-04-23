const Produto = require('../models/User');

module.exports = {
  async Store(req, res) {
    const {
      _id, nome, preco, colecao, tipo, tamanho,
    } = req.body;
    let produto = await Produto.findOne({ _id });
    if (!produto) {
      produto = await Produto.create({
        nome,
        preco,
        colecao,
        tipo,
        tamanho,
      });
    }
    return res.json(produto);
  },
  async Update(req, res) {
    const {
      nome, preco, colecao, tipo, tamanho, _id,
    } = req.body;
    const produto = await Produto.findById(_id);
    if (!produto) return res.sendStatus(404);
    if (
      nome !== produto.nome
      || preco !== produto.preco
      || colecao !== produto.colecao
      || tipo !== produto.tipo
      || tamanho !== produto.tamanho
    ) {
      produto.nome = nome;
      produto.preco = preco;
      produto.colecao = colecao;
      produto.tipo = tipo;
      produto.tamanho = tamanho;
    }
    const result = await produto.save();
    return res.json(result) || res.sendStatus(200);
  },
  async Delete(req, res) {
    // eslint-disable-next-line no-underscore-dangle
    const _id = req.body;
    const result = await Produto.deleteOne({ _id });
    if (result) return res.sendStatus(200);
    return res.sendStatus(404);
  },
  async Index(req, res) {
    const produtos = await Produto.find();
    return res.json(produtos);
  },
};
