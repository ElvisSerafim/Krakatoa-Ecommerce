const mongoose = require('mongoose');
/* const validCPF = require('../helper/validatecpf'); */

const userSchema = new mongoose.Schema({
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
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
