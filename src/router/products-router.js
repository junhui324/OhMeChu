// controller의 객체에 있는 requset handler를 route 하는 코드

import { Router } from "express";
import { productsController } from "../controller/products-controller.js";

const productsRouter = Router();

productsRouter.get("/", productsController.getProductsList);

export {productsRouter};