import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { mongoose } from 'mongoose';
import passport from 'passport';
import { usePassport } from './passport/index.js';
import cookieParser from 'cookie-parser'; //JWT 토큰 사용시 필요한 cookieParser

require('dotenv').config();

import { productsRouter } from './router/products-router.js';
import { ordersRouter } from './router/orders-router.js';
import { usersRouter } from './router/users-router.js';

import { errorMiddlewares } from './middlewares/error-middlewares.js';

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(passport.initialize());
app.use(cookieParser());

//passport 전략 등록
usePassport();

//json parser
app.use(json());
app.use(urlencoded({ extended: true }));

//cors
app.use(cors());

//홈 화면
app.get('/api', (req, res) => {
  res.send('Shopping Mall');
});

//라우터 연결
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
// app.use('/api', authRouter);

app.use(errorMiddlewares);

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`서버가 정상적으로 시작되었습니다. 포트번호: ${port}`);
  });
};

startServer(5000);
startServer(5001);
