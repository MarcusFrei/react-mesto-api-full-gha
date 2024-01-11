const httpStatusCodes = require('../errors/errors');
const Card = require('../models/card');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const Forbidden = require('../errors/forbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user.id;
  Card.create({ name, link, owner })
    .then((card) => res.status(httpStatusCodes.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Get invalid data for card creation!'));
      } else next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFound('Card with current _id can\'t be found!'))
    .then((card) => {
      if (card.owner.toString() === req.user.id) {
        return Card.findByIdAndDelete(req.params.cardId);
      }
      return next(new Forbidden('This card can\'t be deleted!'));
    })
    .then((card) => res.status(httpStatusCodes.CREATED).send(card))
    .catch((err) => {
      if (err.name === 'NotFound') { next(new NotFound('Card with current _id can\'t be found!')); } else if (err.name === 'ValidationError' || err.name === 'BadRequest') { next(new BadRequest(err.message)); } else next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res
          .status(httpStatusCodes.OK)
          .send({ message: 'You put like on this card!' });
      } else {
        next(new NotFound('The specified card _id doesn\'t exist!'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
      } else next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ message: 'You delete like from this card!' });
      } else {
        next(new NotFound('The specified card _id doesn\'t exist!'));
      }
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        next(new NotFound('Card with current _id can\'t be found!'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
      } else next(err);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

// cards - 400, 500
// cards/:cardId - 404
// cards/:cardId/likes - 400,404,500

// ValidationError Ошибка валидации. Возникает, когда данные не соответствуют схеме.
// CastError Ошибка валидации. Возникает, когда передан невалидный ID.
// Идентификаторы в MongoDB имеют определённую структуру
// DocumentNotFoundError Возникает, когда объект не найден.
// По умолчанию, если объект не найден, эта ошибка не генерируется.
// Чтобы это изменить, используйте метод orFail)
