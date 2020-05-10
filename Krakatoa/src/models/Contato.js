const mongoose = require('mongoose');

const contatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
    validate: ((value) => {
      if (value === undefined) throw new Error('Nome Vazio');
    }),
  },
  email: {
    type: String,
    require: true,
    validate: ((value) => {
      if (value === undefined) throw new Error('Email Vazio');
    }),
  },
  assunto: {
    type: String,
    require: true,
    validate: ((value) => {
      if (value === undefined) throw new Error('Assunto Vazio');
    }),
  },
  mensagem: {
    type: String,
    require: true,
    validate: ((value) => {
      if (value === undefined) throw new Error('Mensagem Vazia');
    }),
  },
}, { timestamps: true });
contatoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Contato', contatoSchema);
