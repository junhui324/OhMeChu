import express, { json, urlencoded } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { mongoose } from 'mongoose';
import { usePassport } from './passport/index.js';
require('dotenv').config();

import { productsRouter } from './router/products-router.js';
import { ordersRouter } from './router/orders-router.js';
import { usersRouter } from './router/users-router.js';
import { authRouter } from './router/auth-router.js';

const port = 8080;

const app = express();
//const server = createServer(app);
mongoose.connect(process.env.MONGODB_URI);

usePassport();
app.use(passport.initialize());
//app.use(session({ secret: 'keyboard cat' }));
//app.use(passport.initialize());
//app.use(passport.session());

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());

app.get('/api', (req, res) => {
  res.send('Shopping Mall');
});

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/user', usersRouter);
app.use('/api/login', authRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.statusCode = err.httpCode ?? 500;
  res.json({
    data: null,
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 포트번호: ${port}`);
});

/*
server.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 포트번호: ${port}`);
});*/
