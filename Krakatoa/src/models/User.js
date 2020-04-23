const mongoose = require('mongoose');
/* const validCPF = require('../helper/validatecpf'); */

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  hash: String,
  salt: String,
  cpf: {
    type: String,
    unique: true,
    require: true,
  },
  telefone: {
    type: Number,
    unique: true,
    require: true,
  },
  endereco: {
    cep: Number,
    estado: String,
    cidade: String,
    bairro: String,
    rua: String,
    numero: Number,
  },
});
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
