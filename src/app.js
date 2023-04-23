import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { mongoose } from 'mongoose';
import passport from 'passport';
import { usePassport } from './passport/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

require('dotenv').config();

import { productsRouter } from './router/products-router.js';
import { ordersRouter } from './router/orders-router.js';
import { usersRouter } from './router/users-router.js';
import { authRouter } from './router/auth-router.js';

const app = express();

// app.unsubscribe(cors())

const corsOptions = {
  origin: 'https://example.com',
};

app.use(cors(corsOptions));
mongoose.connect(process.env.MONGODB_URI);

//passport 전략 등록

usePassport();

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  ttl: 14 * 24 * 60,
});

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    // secure: true,
    httpOnly: true,
    store: store,
  })
);
app.use(passport.initialize());

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
app.use('/api/login', authRouter);

//오류처리 미들웨어
app.use((err, req, res, next) => {
  console.log(err);
  res.statusCode = err.httpCode ?? 500;
  res.json({
    data: null,
    error: err.message,
  });
});

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`서버가 정상적으로 시작되었습니다. 포트번호: ${port}`);
  });
};

startServer(5000);
startServer(5001);
