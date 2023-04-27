import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { mongoose } from 'mongoose';
import cookieParser from 'cookie-parser'; //JWT 토큰 사용시 필요한 cookieParser

require('dotenv').config();

import { productsRouter } from './router/products-router.js';
import { ordersRouter } from './router/orders-router.js';
import { usersRouter } from './router/users-router.js';
import { categoryRouter } from './router/category-router.js';
import { errorMiddlewares } from './middlewares/error-middlewares.js';

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(cookieParser());

//json parser
app.use(json());
app.use(urlencoded({ extended: true }));

//cors
app.use(
  cors({
    origin: '*', // 허용할 도메인을 지정합니다. '*'는 모든 도메인을 허용합니다.
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // 허용할 HTTP 메소드를 지정합니다.
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 HTTP 헤더를 지정합니다.
    credentials: true, // 인증정보(Cookie, Authorization header 등)를 포함해서 요청을 허용합니다.
    maxAge: 86400,
    optionsSuccessStatus: 200, // OPTIONS 요청에 대한 응답 상태 코드를 지정합니다.
  })
);

//홈 화면
app.get('/api', (req, res) => {
  res.send('Shopping Mall');
});

//라우터 연결
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/category', categoryRouter);

//오류처리 미들웨어
app.use(errorMiddlewares);

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`서버가 정상적으로 시작되었습니다. 포트번호: ${port}`);
  });
};

startServer(5000);
