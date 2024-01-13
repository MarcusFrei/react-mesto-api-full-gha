const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatusCodes = require('../errors/errors');
const User = require('../models/user');

const { secretCode } = process.env;
const Conflict = require('../errors/conflict');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');

const login = (req, res, next) => {
  console.log(1);
  const { email, password } = req.body;
  User.findUser(email, password).then((user) => {
    const userToken = jwt.sign({ id: user._id }, secretCode, { expiresIn: '7d' });
    return res.status(200).send({ token: userToken });
  })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFound('User with current _id can\'t be found!'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Bad request!'));
      } else next(err);
    });
};

const getMe = (req, res, next) => {
  console.log(req.user);
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        next(new NotFound('User with current _id can\'t be found!'));
      }
      return res.status(httpStatusCodes.OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Bad request!'));
      } else next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashPassword) => User.create({
      name, about, avatar, email, password: hashPassword,
    }))
    .then((user) => {
      const result = user.toObject();
      delete result.password;
      res.status(httpStatusCodes.CREATED).send(result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Bad request!'));
      } else if (err.name === 'MongoServerError' || err.code === 11000) {
        next(new Conflict('User with this email already exists!'));
      } else next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        next(new NotFound('User with current _id can\'t be found!'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Bad request!'));
      } else next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user.id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        next(new NotFound('User with current _id can\'t be found!'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Bad request!'));
      } else next(err);
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUserInfo, updateAvatar, login, getMe,
};

// users- 400, 500
// users/:userId - 400, 500
// users/me - 500
// /me/avatar - 400,404,500
