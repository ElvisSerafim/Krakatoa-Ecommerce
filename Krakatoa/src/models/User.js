/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Email Invalido' });
      }
    },
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
