/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
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
      const accessToken = user.generateAuthToken();
      const obj = { user, accessToken };
      return res.status(200).json(obj);
    }
    return res.send('email já cadastrado').status(400);
  },
  async Update(req, res) {
    try {
      const { user } = req;
      const {
        newPassword, nome, telefone, cpf, email,
      } = req.body;
      const isPasswordMatch = await bcrypt.compare(newPassword, user.password);
      if (!isPasswordMatch) {
        user.password = newPassword;
      }
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
      if (save) return res.send(user).status(200);
    } catch (error) {
      res.send(error).status(404);
    }
  },
  async Delete(req, res) {
    const { _id } = req.user;
    try {
      const result = await User.deleteOne({ _id });
      return res.json(result).status(200);
    } catch (error) {
      res.send(error).Status(404);
    }
  },
  async Login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      if (!user) {
        return res
          .status(401)
          .send({ error: 'Login Falhou! Checar Email e Senha' });
      }
      const token = await user.generateAuthToken();
      const obj = { user, token };
      res.send(obj);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async Logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token,
      );
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async LogoutAll(req, res) {
    try {
      req.user.tokens.splice(0, req.user.tokens.length);
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async UpdateEnde(req, res) {
    try {
      const { user } = req;
      const {
        cep, estado, cidade, bairro, rua, numero,
      } = req.body;
      if (
        cep !== user.endereco.cep
        || estado !== user.endereco.estado
        || cidade !== user.endereco.cidade
        || bairro !== user.endereco.bairro
        || rua !== user.endereco.rua
        || numero !== user.endereco.numero
      ) {
        user.endereco.cep = cep;
        user.endereco.estado = estado;
        user.endereco.bairro = bairro;
        user.endereco.cidade = cidade;
        user.endereco.rua = rua;
        user.endereco.numero = numero;
      }
      const save = await user.save();
      if (save) return res.send(user).status(200);
    } catch (error) {
      res.send(error).status(404);
    }
  },
};
