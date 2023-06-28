/* eslint-disable comma-dangle */
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const cardModel = require('../models/card');

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  cardModel
    .create({ owner: req.user._id, ...req.body })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  cardModel
    .findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (`${card.owner}` !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      return card
        .deleteOne()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

const setLike = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
};
