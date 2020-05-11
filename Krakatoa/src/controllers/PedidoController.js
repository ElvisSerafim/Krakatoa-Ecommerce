const Pedido = require('../models/Pedidos');
const Produto = require('../models/Produto');
const User = require('../models/User');

module.exports = {
  async Store(req, res) {
    try {
      const {
        precoTotal,
        frete,
        user,
        produtos,
      } = req.body;

      const { id } = user;

      const pedido = await Pedido.create({
        precoTotal,
        frete,
      });

      while (produtos.length != 0) {
        const produtoArray = produtos.pop();
        console.log(produtoArray);
        const produto = await Produto.findById(produtoArray.id);
        pedido.produtos.push(produto);
      }

      const usuario = await User.findById(id);
      usuario.pedidos.push(pedido);
      pedido.user = usuario;
      await pedido.save();

      await usuario.save();

      if (pedido) return res.json(pedido);
      throw new Error('Não foi possivel realizar o envio do pedido !');
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
