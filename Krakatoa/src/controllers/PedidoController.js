const Pedido = require('../models/Pedidos');
const Produto = require('../models/Produto');
const User = require('../models/User');

module.exports = {
  async Store(req, res) {
    try {
      const { precoTotal, frete, user, produtos } = req.body;

      const { id } = user;

      const pedido = await Pedido.create({
        precoTotal,
        frete,
      });


      while (produtos.length !== 0) {
        const produtoArray = produtos.pop();
        let quantidadePedido = produtoArray.quantidade;
        let produto = await Produto.findById(produtoArray.id);
        let final = {
          produto,
          quantidadePedido
        }
        pedido.produtos.push(final);
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

  async getPedidos(req, res) {

    try {
      const { user } = req.body;

      const { id } = user;
      
      const usuario = await User.findById(id);
      let arrayAux = usuario.pedidos;
      let arrayPedidos = [];
      let arrayPedidosFinal = [];

      while (arrayAux.length !== 0) {
        const idPedido = arrayAux.pop();
        const pedido = await Pedido.findById(idPedido);
        arrayPedidos.push(pedido);
      }

      let arrayAuxPedidos = arrayPedidos;
      while (arrayAuxPedidos.length != 0) {
        const pedidos = arrayAuxPedidos.pop();
        if (pedidos != null) {
          let arr = pedidos.produtos;
          let arrayProdutos = [];
          while (arr.length != 0) {
            let item = arr.pop();
            let product = await Produto.findById(item.produto);
            let quantidadePedida = item.quantidadePedido;

            let produtoFinal = {
              produto: product,
              quantidade: quantidadePedida
            }
            arrayProdutos.push(produtoFinal);
          }
          let pedidoFinal = {
              pedido: pedidos,
              produtosPedido: arrayProdutos
          }
          arrayPedidosFinal.push(pedidoFinal);
        }
      }



      if (usuario) return res.json(arrayPedidosFinal);
      throw new Error('Erro ao retornar pedidos !');
    } catch (error) {
      return res.status(500).send(error);
    }

  }

};
