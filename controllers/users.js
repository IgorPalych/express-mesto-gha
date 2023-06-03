const UserModel = require('../models/user');

// в этих контроллерах использован подход с промисами

const getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Ошибка сервера',
        err: err.message,
        stack: err.stack,
      });
    });
};

const getUserById = (req, res) => {
  const id = req.params.userId;
  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы неверные данные' });
      } else {
        res.status(500).send({
          message: 'Ошибка сервера',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы неверные данные' });
      } else {
        res.status(500).send({
          message: 'Ошибка сервера',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Ошибка сервера',
        err: err.message,
        stack: err.stack,
      });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  UserModel.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({
          message: 'Ошибка сервера',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
