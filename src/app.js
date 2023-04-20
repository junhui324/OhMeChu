import express, { json, urlencoded } from "express";
import {mongoose} from "mongoose";
// import main from "./main";
require("dotenv").config();

import {productsRouter} from "./router/products-router.js";

const app = express();
mongoose.connect(process.env.MONGODB_URI);

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
  
app.listen(8080);