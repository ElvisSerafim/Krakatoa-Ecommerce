/* eslint-disable consistent-return */
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = {
  async Store(req, res) {
    const {
      nome, email, telefone, cpf, password,
    } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        nome,
        email,
        telefone,
        cpf,
        password,
      });
      return res.json(user);
    }
    return res.send('email já cadastrado').status(400);
  },
  async Update(req, res) {
    const {
      nome, email, telefone, cpf, password, newPassword,
    } = req.body;
    const { id } = req.params.id;
    try {
      const user = await User.findById(id).catch((e) => res.send(e).status(404));
      bcrypt.compare(password, user.password, async (error, result) => {
        if (result) {
          if (newPassword !== password && newPassword !== '') user.password = newPassword;
          if (
            nome !== user.nome
            || email !== user.email
            || telefone !== user.telefone
            || cpf !== user.cpf
          ) {
            user.nome = nome;
            user.email = email;
            user.telefone = telefone;
            user.cpf = cpf;
          }
          const save = await user.save();
          if (save) return res.sendStatus(200);
        }
        return error;
      });
    } catch (error) {
      res.send(error).status(404);
    }
  },
  async Delete(req, res) {
    const { id } = req.params.id;
    const { password } = req.body;
    try {
      const user = await User.findById(id).catch((e) => res.send(e).status(400));
      bcrypt.compare(password, user.password, async (error, result) => {
        if (result) {
          const worked = await User.deleteOne({ id });
          return res.json(worked).status(200);
        }
        return error;
      });
    } catch (error) {
      res.send('Senha invalida').Status(404);
    }
  },
  async Login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.find({ email }).catch((e) => res.send(e).status(400));
      bcrypt.compare(password, user.password, async (error, result) => {
        if (result) {
          const accessToken = Jwt.sign(user, process.env.JWT_KEY);
          return res.json(user, { accessToken });
        }
        return error;
      });
    } catch (error) {
      res.send(error).status(404);
    }
  },
};
