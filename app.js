const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключились к базе...');
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе: ', err);
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '647da5d4e18c986e7f19c5be',
  };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}...`);
});
