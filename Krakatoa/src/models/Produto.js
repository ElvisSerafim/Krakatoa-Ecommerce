const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    require: true,
  },
  preco: {
    type: Number,
    require: true,
  },
  colecao: {
    type: String,
    require: true,
  },
  tipo: {
    type: String,
    require: true,
  },
  tamanho: {
    type: String,
    require: true,
  },
  promocao: {
    type: Boolean,
  },
  promopreco: {
    type: Number,
  },
  quantidade: {
    type: Number,
    required: true,
  },
});
produtoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Produto', produtoSchema);
