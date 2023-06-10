const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { validateSignUp, validateSignIn } = require('./middlewares/validate');
const router = require('./routes');

const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { handleError } = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use(router);

app.use(errors());

app.use(handleError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключились к базе...');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порте ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе: ', err);
  });
