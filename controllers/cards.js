const CardModel = require('../models/card');

// в этих контроллерах использован подход try-catch

const getCards = async (req, res) => {
  try {
    const cards = await CardModel.find({});
    res.send(cards);
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await CardModel.findByIdAndRemove(req.params.cardId);
    res.send(card);
  } catch (error) {
    console.log(error);
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    res.send(card);
  } catch (error) {
    console.log(error);
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await CardModel.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    res.send(card);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
