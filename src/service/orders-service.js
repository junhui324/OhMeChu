// 비즈니스 로직을 수행하는 코드 -> controller로 전달
import { ordersDAO } from '../db/ordersDAO.js';

const ordersService = {
  //주문 정보 저장 (구현)
  addOrder: async (orderObj) => {
    const addOrder = await ordersDAO.createOrder(orderObj);
    return addOrder;
  },

  //주문 정보 리스트 불러오기 (구현)
  getOrdersList: async () => {
    const allOrders = await ordersDAO.findOrdersMany();
    return allOrders;
  },

  //주문 id 활용해서 주문 정보 하나 불러오기 (구현)
  getOrder: async (id) => {
    const order = await ordersDAO.findOrderById(id);
    return order;
  },

  //주문 id 활용해서 해당 주문 내역 배송 상태 수정하기 (관리자 기능)
  updateOrderState: async (id, orderState) => {
    const order = await ordersDAO.updateOrderStateById(id, orderState);
    return order;
  },

  //주문 id 활용해서 주문 정보 업데이트
  updateOrder: async (id, userName, phoneNumber, requirement, address) => {
    const order = await ordersDAO.updateOrderById(
      id,
      userName,
      phoneNumber,
      requirement,
      address
    );
    return order;
  },

  //주문 id 활용해서 주문 취소(삭제) 하기 -> 주문 취소 (orderState가 "배송준비중" 일 때)
  deleteOrder: async (id, email) => {
    const order = await ordersDAO.deleteOrderById(id, email);
    return order;
  },
};

export { ordersService };
