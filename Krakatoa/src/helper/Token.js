const Jwt = require('jsonwebtoken');

module.exports = {
  Authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    Jwt.verify(token, global.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
      return null;
    });
    return null;
  },
};
