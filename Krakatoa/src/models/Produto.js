const mongoose = require('mongoose');

const tipos = ['cangas', 'vestidos', 'batas', 'shorts', 'confeccões'];

const produtoSchema = new mongoose.Schema(
  {
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
    },
    categoria: {
      type: String,
    },
    tipo: {
      type: String,
      require: true,
      validate: (value) => {
        const test = tipos.includes(value);
        if (!test) {
          throw new Error({ error: 'Categoria de Produto Invalida' });
        }
      },
    },
    tamanho: [
      {
        type: String,
        require: true,
      },
    ],
    imagens: [
      {
        type: String,
        require: true,
      },
    ],
    cores: [
      {
        type: String,
        require: true,
      },
    ],
    descricao: {
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
    vendas: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
produtoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Produto', produtoSchema);
