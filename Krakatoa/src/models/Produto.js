const mongoose = require('mongoose');
/* const validCPF = require('../helper/validatecpf'); */

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
    type: Number,
  },
});
produtoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Produto', produtoSchema);
