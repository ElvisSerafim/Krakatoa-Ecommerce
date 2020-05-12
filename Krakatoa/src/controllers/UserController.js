/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = {
  async Store(req, res) {
    try {
      const {
        email, password,
      } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          password,
        });
        const accessToken = await user.generateAuthToken();
        const obj = { user, accessToken };
        return res.json(obj).status(200);
      }
      throw new Error('Email já cadastrado');
    } catch (error) {
      return res.send(error).status(401);
    }
  },
  async Update(req, res) {
    try {
      const { user } = req;
      const {
        newPassword, nome, telefone, password,
      } = req.body;

      if (newPassword !== undefined) {
        const passwordMatchUser = await bcrypt.compare(password, user.password);
        if (passwordMatchUser) {
          const isPasswordMatch = await bcrypt.compare(
            newPassword,
            user.password,
          );
          user.password = isPasswordMatch
            ? (user.password = newPassword)
            : user.password;
        }
      }

      user.nome = typeof (nome) === 'string'
        && nome.length > 0
        && user.nome !== nome
        ? (user.nome = nome)
        : user.nome;

      user.telefone = typeof (telefone) === 'string'
        && telefone.length === 11
        && user.telefone !== telefone
        ? (user.telefone = telefone)
        : user.telefone;

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

      if (!(typeof (email) === 'string' && email.length > 0)) return new Error('Email Invalido');
      if (!(typeof (password) === 'string' && password.length > 0)) return new Error('Password Invalido');

      const user = await User.findByCredentials(email, password);

      if (user) {
        const token = await user.generateAuthToken();
        const obj = { user, token };
        return res.send(obj);
      }

      throw new Error('Login Falhou! Checar Email e Senha');
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
      const response = await req.user.save();
      if (response) {
        return res.status(200).send('Você Saiu');
      }
      throw new Error('Não pode desconectar');
    } catch (error) {
      res.status(500).send(error);
    }
  },
  async UpdateEnde(req, res) {
    try {
      const { user } = req;
      const {
        cep, estado, cidade, bairro, rua, numero, nome, telefone, cpf,
      } = req.body;

      user.endereco.cep = typeof (cep) === 'number'
       && user.endereco.cep !== cep
        ? cep
        : user.endereco.cep;

      user.endereco.estado = typeof (estado) === 'string'
       && estado.trim().length > 0
       && user.endereco.estado !== estado
        ? estado
        : user.endereco.estado;

      user.endereco.cidade = typeof (cidade) === 'string'
       && cidade.trim().length > 0
       && user.endereco.cidade !== cidade
        ? cidade
        : user.endereco.cidade;

      user.endereco.bairro = typeof (bairro) === 'string'
       && bairro.trim().length > 0
       && user.endereco.bairro !== bairro
        ? bairro
        : user.endereco.bairro;

      user.endereco.rua = typeof (rua) === 'string'
       && rua.trim().length > 0
       && user.endereco.rua !== rua
        ? rua
        : user.endereco.rua;

      user.endereco.numero = typeof (numero) === 'number'
       && user.endereco.numero !== numero
        ? numero
        : user.endereco.numero;

      user.nome = typeof (nome) === 'string'
       && nome.trim().length > 0
       && user.nome !== nome
        ? nome
        : user.nome;

      user.telefone = typeof (telefone) === 'string'
       && telefone.trim().length === 11
       && user.telefone !== telefone
        ? telefone
        : user.telefone;

      user.cpf = typeof (cpf) === 'number'
       && user.cpf !== cpf
        ? cpf
        : user.cpf;

      const save = await user.save();
      if (save) return res.status(200).send(user);
      throw new Error('Não foi possivel Salvar');
    } catch (error) {
      return res.status(404).send(error);
    }
  },
};
