require('dotenv').config();
const express = require('express');

const app = express();
const { PORT } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const { DB } = process.env;
mongoose.connect(DB);
const router = require('./routes');
const errorsSender = require('./errors/errorsSender');

const { signUpScheme, signInScheme } = require('./joiSchemes');
const NotFound = require('./errors/notFound');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT);
app.post('/signin', celebrate(signInScheme), login);
app.post('/signup', celebrate(signUpScheme), createUser);
app.use('/users', auth, router.users);
app.use('/cards', auth, router.cards);

app.use('*', auth, (req, res, next) => {
  next(new NotFound('Such path is not exist!'));
});

app.use(errors());
app.use(errorsSender);
