const mongoose = require('mongoose');

const pagamentoSchema = new mongoose.Schema({
  produto: {
    type: String,
    require: true,
  },
  preco: {
    type: Number,
    require: true,
    min: 10,
  },
  metodo: {
    type: String,
    require: true,
  },
  pessoa: {
    type: String,
    require: true,
  },
  data: {
    type: Date,
    require: true,
    unique: true,
  },
}, { timestamps: true });
pagamentoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Pagamento', pagamentoSchema);
