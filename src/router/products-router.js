// controller의 객체에 있는 requset handler를 route 하는 코드

import { Router } from 'express';
import { productsController } from '../controller/products-controller.js';

const productsRouter = Router();

//관리자 기능이므로 /admin에서 추가
productsRouter.post(
  '/admin',
  productsController.addProductsList,
  productsController.addProduct
);

productsRouter.put('/admin', productsController.updateProductsList);
productsRouter.put('/:id/admin', productsController.updateProduct);

productsRouter.delete('/:id/admin', productsController.deleteProduct);

productsRouter.get('/', productsController.getProductsList); //query String 사용 "sort=sortKey"
productsRouter.get('/:id', productsController.getProduct);
productsRouter.get('/recommendations', productsController.getRecommendedList);
productsRouter.get('/new', productsController.getNewProductsList);

export { productsRouter };
