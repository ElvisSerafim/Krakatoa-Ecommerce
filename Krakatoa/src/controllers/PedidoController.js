const Pedido = require('../models/Pedidos');
const Produto = require('../models/Produto');
const User = require('../models/User');

module.exports = {
  async Store(req, res) {
    try {
      const { precoTotal, frete, user, produtos, data } = req.body;

      const { id } = user;

      const pedido = await Pedido.create({
        precoTotal,
        frete,
        data,
      });

      while (produtos.length !== 0) {
        const produtoArray = produtos.pop();
        const quantidadePedido = produtoArray.quantidade;
        const tamanhoEscolhido = produtoArray.tamanho;
        const corEscolhida = produtoArray.color;
        const produto = await Produto.findById(produtoArray.id);
        const final = {
          produto,
          quantidadePedido,
          tamanhoEscolhido,
          corEscolhida,
        };
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
      const arrayAux = usuario.pedidos;
      const arrayPedidos = [];
      const arrayPedidosFinal = [];

      while (arrayAux.length !== 0) {
        const idPedido = arrayAux.pop();
        const pedido = await Pedido.findById(idPedido);
        arrayPedidos.push(pedido);
      }

      const arrayAuxPedidos = arrayPedidos;
      while (arrayAuxPedidos.length !== 0) {
        const pedidos = arrayAuxPedidos.pop();
        if (pedidos != null) {
          const arr = pedidos.produtos;
          const arrayProdutos = [];
          while (arr.length != 0) {
            const item = arr.pop();
            const product = await Produto.findById(item.produto);
            const quantidadePedida = item.quantidadePedido;
            const tamanho = item.tamanhoEscolhido;
            const cor = item.corEscolhida;
            const produtoFinal = {
              produto: product,
              quantidade: quantidadePedida,
              tamanhoEscolhida: tamanho,
              corEscolhida: cor,
            };
            arrayProdutos.push(produtoFinal);
          }
          const pedidoFinal = {
            pedido: pedidos,
            produtosPedido: arrayProdutos,
          };
          arrayPedidosFinal.push(pedidoFinal);
        }
      }

      if (usuario) return res.json(arrayPedidosFinal);
      throw new Error('Erro ao retornar pedidos !');
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
