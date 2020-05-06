/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const teste = req.header('Authorization');
    const token = teste.length > 0 ? teste.replace('Bearer ', '') : 'error';
    const data = token === 'error' ? 'error' : jwt.verify(token, process.env.JWT_KEY);
    if (data === 'error') throw new Error('Falta Token');
    const user = await User.findOne({ _id: data._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};
module.exports = auth;
