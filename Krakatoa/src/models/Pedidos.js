const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema(
  {
    precoTotal: {
      type: Number,
      require: true,
    },

    frete: {
      type: Number,
      require: true,
    },

    data: {
      type: Date,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    produtos: [
      { 
        produto: {
          type: mongoose.Schema.Types.ObjectId, ref: 'Produto'
        },
        quantidadePedido: {
          type: Number,
          require: true
        }
     }
    ],
  },
  { timestamps: true },
);
pedidoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
