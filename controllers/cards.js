const CardModel = require('../models/card');

const BadRequestError = require('../errors/BadRequestError'); /* 400 */
const ForbiddenError = require('../errors/ForbiddenError'); /* 403 */
const NotFoundError = require('../errors/NotFoundError'); /* 404 */

// в этих контроллерах использован подход try-catch

const getCards = async (req, res, next) => {
  try {
    const cards = await CardModel.find({});
    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await CardModel.create({
      name,
      link,
      owner: req.user._id,
    });
    res.send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await CardModel.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Нет такой карточки');
    }
    if (!card.owner.equals(req.user._id)) {
      throw new ForbiddenError('У вас нет прав на удаление этой карточки');
    }
    await CardModel.deleteOne(card);
    res.send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Нет такой карточки');
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Нет такой карточки');
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
