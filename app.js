const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes');

const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}...`);
});
