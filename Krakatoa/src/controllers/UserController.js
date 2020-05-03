const Jwt = require('jsonwebtoken');
const User = require('../models/User');
const Hash = require('../helper/hash');

module.exports = {
  async Store(req, res) {
    const {
      nome, email, telefone, cpf, password,
    } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      const secure = Hash.setPassword(password);
      const { salt, hash } = secure;
      user = await User.create({
        nome,
        email,
        telefone,
        cpf,
        hash,
        salt,
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
      const valid = await Hash.validadePassword(user.hash, user.salt, password);
      if (valid) {
        if (newPassword !== password && newPassword !== '') {
          const secure = await Hash.setPassword(newPassword);
          const { hash, salt } = secure;
          user.hash = hash;
          user.salt = salt;
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
        const result = await user.save();
        if (result) return res.sendStatus(200);
      }
    } catch (error) {
      res.send(error).status(404);
    }
    return null;
  },
  async Delete(req, res) {
    const { id } = req.params.id;
    const { password } = req.body;
    try {
      const user = await User.findById(id);
      const valid = await Hash.validadePassword(user.hash, user.salt, password);
      if (valid) {
        const result = await User.deleteOne({ id });
        return res.json(result).status(200);
      }
    } catch (error) {
      res.sendStatus(404);
    }
    return null;
  },
  async Login(req, res) {
    const { email, password } = req.body;
    let valid = false;
    const user = await User.find({ email });
    if (user) {
      valid = await Hash.validadePassword(user.hash, user.salt, password);
      if (valid) {
        const accessToken = Jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        return res.json(user, { accessToken });
      }
      return res.sendStatus(400);
    }
    return res.sendStatus(400);
  },
};
