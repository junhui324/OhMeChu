// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { ordersService } from '../service/orders-service.js';

const ordersController = {
  //주문 정보 저장
  addOrder: async (req, res, next) => {
    try {
      const {
        orderDetail,
        email,
        userName,
        phoneNumber,
        address,
        requirement,
        purchaseAmount,
        deliveryFee,
        totalAmount,
        orderState,
      } = req.body;
      const orderObj = {
        orderDetail: orderDetail,
        email: email,
        userName: userName,
        phoneNumber: phoneNumber,
        address: address,
        requirement: requirement,
        purchaseAmount: purchaseAmount,
        deliveryFee: deliveryFee,
        totalAmount: totalAmount,
        orderState: orderState,
      };
      const order = await ordersService.addOrder(orderObj);
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  //주문 정보 리스트 불러오기
  getOrdersList: async (req, res, next) => {
    try {
      const orders = await ordersService.getOrdersList();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  //주문 id 활용해서 주문 정보 하나 불러오기
  getOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await ordersService.getOrder(id);
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  //주문 id 활용해서 해당 주문 내역 배송 상태 수정하기 (관리자 기능)
  updateOrderState: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { orderState } = req.body;
      const order = await ordersService.updateOrderState(id, orderState);
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  //주문 id 활용해서 주문 정보 업데이트 -> 배송지 변경 (order_state가 "상품 준비 중" 일 때)
  updateOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { changeAddress } = req.body;
      const order = await ordersService.updateOrder(id, changeAddress);
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  //주문 id 활용해서 주문 취소(삭제) 하기 -> 주문 취소 (order_state가 "상품 준비 중" 일 때)
  deleteOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await ordersService.deleteOrder(id);
      res.json(order);
    } catch (err) {
      next(err);
    }
  },
  //추가
};

export { ordersController };
