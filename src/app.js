import express, { json, urlencoded } from "express";
import cors from "cors";
import {mongoose} from "mongoose";
require("dotenv").config();

import {productsRouter} from "./router/products-router.js";

const port = 8080;
const app = express();
mongoose.connect(process.env.MONGODB_URI);

// app.unsubscribe(cors())

const corsOptions = {
  origin: 'https://example.com'
};

app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({extended: true}));

app.use("/api/products", productsRouter);

app.get("/api", (req, res) => {
  res.send("Shopping Mall");
});

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