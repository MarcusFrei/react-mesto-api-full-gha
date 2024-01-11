const { Joi } = require('celebrate');
const { urlRegex } = require('../utils');

const signUpScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().pattern(urlRegex).optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
};
const signInScheme = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
};

const updateUserScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const updateAvatarScheme = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex).required(),
  }),
};

const createCardScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegex).required(),
  }),
};

const cardIdScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};

module.exports = {
  signUpScheme,
  updateUserScheme,
  signInScheme,
  updateAvatarScheme,
  createCardScheme,
  cardIdScheme,
};
