const CardModel = require('../models/card');

// в этих контроллерах использован подход try-catch

const getCards = async (req, res) => {
  try {
    const cards = await CardModel.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).send({
      message: 'Ошибка сервера',
      err: err.message,
      stack: err.stack,
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
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else {
      res.status(500).send({
        message: 'Ошибка сервера',
        err: err.message,
        stack: err.stack,
      });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await CardModel.findByIdAndRemove(req.params.cardId);
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(500).send({
        message: 'Ошибка сервера',
        err: err.message,
        stack: err.stack,
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
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(500).send({
        message: 'Ошибка сервера',
        err: err.message,
        stack: err.stack,
      });
    }
  }
};

const dislikeCard = async (req, res) => {
  if (!req.params.cardId) {
    res.status(404).send({ message: 'Карточка не найдена' });
    return;
  }
  try {
    const card = await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы неверные данные' });
    } else {
      res.status(500).send({
        message: 'Ошибка сервера',
        err: err.message,
        stack: err.stack,
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
