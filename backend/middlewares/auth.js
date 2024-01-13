const jwt = require('jsonwebtoken');

const { secretCode } = process.env;
const Unauthorized = require('../errors/unauthorized');

const auth = (req, res, next) => {
  console.log(2);
  const { authorization } = req.headers;
  if (!authorization) {
    next(new Unauthorized('!User is not authorized!'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretCode);
  } catch (err) {
    next(new Unauthorized('User is not authorized!'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
