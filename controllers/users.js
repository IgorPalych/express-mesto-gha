const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

const {
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  MONGO_DUPLICATE_KEY_ERROR,
  SALT_ROUNDS,
} = require('../utils/constants');

// в этих контроллерах использован подход с промисами

const getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
    });
};

const getUserById = (req, res) => {
  const id = req.params.userId;
  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы неверные данные' });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'Ошибка сервера',
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
        res.status(VALIDATION_ERROR).send({ message: 'Переданы неверные данные' });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'Ошибка сервера',
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
    .catch(() => {
      res.status(SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => UserModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({ data: user }); /* Проверить в ТЗ, что отправлять */
    })
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
        res.status(409).send({ messsage: 'Пользователь с этим email уже существет' });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({
          message: 'Ошибка сервера',
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
