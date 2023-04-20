import express, { json, urlencoded } from 'express';
import cors from 'cors';
//import http, { createServer } from 'http';
import { mongoose } from 'mongoose';
// import main from "./main";
require('dotenv').config();

import { productsRouter } from './router/products-router.js';
import { ordersRouter } from './router/orders-router.js';

const port = 8080;

const app = express();
//const server = createServer(app);
mongoose.connect(process.env.MONGODB_URI);

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());

app.get('/api', (req, res) => {
  res.send('Shopping Mall');
});

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

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
