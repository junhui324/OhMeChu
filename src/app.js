import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { mongoose } from 'mongoose';
import passport from 'passport';
import { usePassport } from './passport/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

require('dotenv').config();

//import { usePassport } from './passport/index.js';

import { productsRouter } from './router/products-router.js';
import { ordersRouter } from './router/orders-router.js';
import { usersRouter } from './router/users-router.js';
import { authRouter } from './router/auth-router.js';
import { categoryRouter } from './router/category-router.js';

import { errorMiddlewares } from './middlewares/error-middlewares.js';

const port = 5000;
const app = express();

app.use(cors());
mongoose.connect(process.env.MONGODB_URI);

//passport 전략 등록

usePassport();

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  ttl: 24 * 60 * 60,
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

//serialize
passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  await Users.findOne({ email }, (err, user) => {
    console.log('deserialize');
    done(err, user);
  });
});

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
app.use('/api/category', categoryRouter);
app.use('/api', authRouter);

//오류처리 미들웨어
app.use(errorMiddlewares);

app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 포트번호: ${port}`);
});
