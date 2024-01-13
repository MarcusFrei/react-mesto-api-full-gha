const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { urlRegex, emailRegex } = require('../utils/index');
const Unauthorized = require('../errors/unauthorized');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => emailRegex.test(email),
        message: 'E-mail requiered!',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: ({ length }) => length >= 6,
        message: 'Password should be from 6 symbols!',
      },
    },
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'Username should be from 2 up to 30 symbols!',
      },
    },
    about: {
      type: String,
      default: 'Исследователь океана',
      validate: {
        validator: ({ length }) => length >= 2 && length <= 30,
        message: 'User info should be from 2 up to 30 symbols!',
      },
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => urlRegex.test(url),
        message: 'URL requiered!',
      },
    },
  },
  {
    versionKey: false,
    statics: {
      findUser(email, password) {
        return this.findOne({ email }).select('+password').then((user) => {
          if (user) {
            return bcrypt.compare(password, user.password)
              .then((answer) => {
                if (answer) return user;
                return Promise.reject(new Unauthorized('User is not authorized!'));
              });
          } return Promise.reject(new Unauthorized('User with current e-mail can\'t be found!'));
        });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
