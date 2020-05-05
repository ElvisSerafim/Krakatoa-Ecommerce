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

      if (newPassword !== undefined) {
        const isPasswordMatch = await bcrypt.compare(
          newPassword,
          user.password,
        );
        user.password = !isPasswordMatch
          ? (user.password = newPassword)
          : user.password;
      }

      user.nome = nome !== undefined && user.nome !== nome
        ? (user.nome = nome)
        : user.nome;
      user.email = email !== undefined && user.email !== email
        ? (user.email = email)
        : user.email;
      user.telefone = telefone !== undefined && user.telefone !== telefone
        ? (user.telefone = telefone)
        : user.telefone;
      user.cpf = cpf !== undefined && user.cpf !== cpf ? (user.cpf = cpf) : user.cpf;

      const save = await user.save();
      if (save) return res.json(user).status(200);
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

      user.endereco.cep = cep !== undefined
       && user.endereco.cep !== cep
        ? cep
        : user.endereco.cep;

      user.endereco.estado = estado !== undefined
       && user.endereco.estado !== estado
        ? estado
        : user.endereco.estado;

      user.endereco.cidade = cidade !== undefined
       && user.endereco.cidade !== cidade
        ? cidade
        : user.endereco.cidade;

      user.endereco.bairro = bairro !== undefined
       && user.endereco.bairro !== bairro
        ? bairro
        : user.endereco.bairro;

      user.endereco.rua = rua !== undefined
       && user.endereco.rua !== rua
        ? rua
        : user.endereco.rua;
      user.endereco.numero = numero !== undefined
       && user.endereco.numero !== numero
        ? numero
        : user.endereco.numero;

      const save = await user.save();
      if (save) return res.send(user).status(200);
    } catch (error) {
      res.send(error).status(404);
    }
  },
};
