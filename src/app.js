import express, { json, urlencoded } from 'express';
import cors from 'cors';
//import http, { createServer } from 'http';
import { mongoose } from 'mongoose';
import passport from 'passport';
import {usePassport} from './passport/index.js'
// import main from "./main";
require('dotenv').config();

import { productsRouter } from './router/products-router.js';
import { ordersRouter } from './router/orders-router.js';
// import { usersRouter } from './router/users-router.js';
import { authRouter } from './router/auth-router.js';


const port = 8080;
const app = express();

// app.unsubscribe(cors())

const corsOptions = {
  origin: 'https://example.com'
};

app.use(cors(corsOptions));
//const server = createServer(app);
mongoose.connect(process.env.MONGODB_URI);

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
app.use(passport.initialize());
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
// app.use('/api/users', usersRouter);
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

app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 포트번호: ${port}`);
});

/*
server.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 포트번호: ${port}`);
});*/
