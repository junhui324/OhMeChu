// controller의 객체에 있는 requset handler를 route 하는 코드

import { Router } from 'express';
import { productsController } from '../controller/products-controller.js';

const productsRouter = Router();

//상품 하나 추가
productsRouter.post('/admin', productsController.addProductOne);

//상품 여러개 추가
productsRouter.post('/admin/1', productsController.addProducts);

//상품 정렬
//productsRouter.get('/sort', productsController.getProductsSort);

//상품 전체 불러오기 , 상품 정렬
productsRouter.get('/', productsController.getProductsSort);

//상품 id 활용해서 해당 상품만 불러오기
productsRouter.get('/:id', productsController.getProduct);

//상품 id 활용해서 해당 상품 정보 업데이트
productsRouter.put('/:id', productsController.updateProduct);

//상품 id 활용해서 해당 상품 삭제
productsRouter.delete('/:id', productsController.deleteProduct);

export { productsRouter };
