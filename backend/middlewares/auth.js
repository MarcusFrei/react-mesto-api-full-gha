const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../utils/constant');

const Unauthorized = require('../errors/unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Unauthorized('!User is not authorized!'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new Unauthorized('User is not authorized!'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
