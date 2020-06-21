/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
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
    cpf: {
      type: String,
    },
    telefone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    endereco: {
      cep: Number,
      estado: String,
      cidade: String,
      bairro: String,
      rua: String,
      numero: Number,
      complemento: String,
    },
    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre('save', async function hashPassword(next) {
  try {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password along with our new salt
    const hash = await bcrypt.hash(user.password, salt);

    // override the cleartext password with the hashed one
    user.password = hash;
    return next();
  } catch (e) {
    return next(e);
  }
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

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' });
  }
  return user;
};

const User = mongoose.model('User', userSchema);

userSchema.set('toJSON', { virtuals: true });

module.exports = User;
