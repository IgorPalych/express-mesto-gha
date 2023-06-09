const CardModel = require('../models/card');

const {
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
} = require('../utils/constants');

// в этих контроллерах использован подход try-catch

const getCards = async (req, res) => {
  try {
    const cards = await CardModel.find({});
    res.send(cards);
  } catch (err) {
    res.status(SERVER_ERROR).send({
      message: 'Ошибка сервера',
    });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await CardModel.create({
      name,
      link,
      owner: req.user._id,
    });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
    } else {
      res.status(SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await CardModel.findByIdAndRemove(req.params.cardId);
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }

    if (card.owner.toString() !== req.user._id) {
      throw new Error('У вас нет прав на удаление этой карточки');
    }

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(VALIDATION_ERROR).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(VALIDATION_ERROR).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND_ERROR).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(VALIDATION_ERROR).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
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
