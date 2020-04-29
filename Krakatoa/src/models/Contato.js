const mongoose = require('mongoose');

const contatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  assunto: {
    type: String,
    require: true,
  },
  mensagem: {
    type: String,
    require: true,
  },
});
contatoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Contato', contatoSchema);
