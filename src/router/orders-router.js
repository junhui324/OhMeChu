// controller의 객체에 있는 requset handler를 route 하는 코드

import { Router } from 'express';
import { ordersController } from '../controller/orders-controller.js';

const ordersRouter = Router();

//주문 정보 저장
ordersRouter.post('/', ordersController.addOrder);

//주문 정보 리스트 불러오기 (관리자 기능)
ordersRouter.get('/', ordersController.getOrdersList);

//주문 id 활용해서 주문 정보 하나 불러오기
ordersRouter.get('/:id', ordersController.getOrder);

//주문 id 활용해서 해당 주문 내역 배송 상태 수정하기 (관리자 기능)
ordersRouter.patch('/:id', ordersController.updateOrderState);

//주문 id 활용해서 주문 정보 업데이트
ordersRouter.put('/:id', ordersController.updateOrder);

//주문 id 활용해서 주문 취소(삭제) 하기 -> 주문 취소
ordersRouter.delete('/:id', ordersController.deleteOrder);

export { ordersRouter };
