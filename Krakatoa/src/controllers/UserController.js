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
    }
    return res.json(user);
  },
  async Update(req, res) {
    const {
      nome, email, telefone, cpf, password, newPassword, _id,
    } = req.body;
    const user = await User.findById(_id);
    if (!user) return res.sendStatus(404);
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
    return res.sendStatus(404);
  },
  async Delete(req, res) {
    const { password, _id } = req.body;
    const user = await User.findById(_id);
    const valid = await Hash.validadePassword(user.hash, user.salt, password);
    if (valid) {
      const result = await User.deleteOne({ _id });
      return res.json(result) || res.sendStatus(200);
    }
    return res.sendStatus(404);
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
