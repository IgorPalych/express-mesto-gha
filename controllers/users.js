const UserModel = require('../models/user');

// в этих контроллерах использован подход с промисами

const getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUserById = (req, res) => {
  const id = req.params.userId;
  UserModel.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  UserModel.create({ name, about, avatar })
    .then((user) => {
      res.send(`Пользователь ${user} создан`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true },
  )
    .then((user) => {
      res.send(`Профиль пользователя ${user} обновлен`);
    })
    .catch((error) => {
      console.log(error);
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
      res.send(`Аватар пользователя ${user} обновлен`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
