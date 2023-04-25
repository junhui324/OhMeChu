// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Orders } from '../db/model/index.js';

// 주문 상태 문자열 열거형
const orderStates = {
  productReady: '상품 준비 중',
  deliveryReady: '배송 준비 중',
  courierDelivery: '배송 중',
  deliveryCompleted: '배송 완료',
};

const ordersService = {
  //주문 정보 저장 (구현)
  addOrder: async (orderObj) => {
    orderObj.totalAmount =
      parseInt(orderObj.purchaseAmount) + parseInt(orderObj.deliveryFee);
    const order = await Orders.create(orderObj);
    return order;
  },

  //주문 정보 리스트 불러오기 (구현)
  getOrdersList: async () => {
    const allOrders = await Orders.find({});
    return allOrders;
  },

  //주문 id 활용해서 주문 정보 하나 불러오기 (구현)
  getOrder: async (id) => {
    const order = await Orders.findById(id);
    return order;
  },

  //주문 id 활용해서 해당 주문 내역 배송 상태 수정하기 (관리자 기능)
  updateOrderState: async (id, orderState) => {
    const order = await Orders.findByIdAndUpdate(id, {
      orderState: orderState,
    });
    return order;
  },

  //주문 id 활용해서 주문 정보 업데이트 -> 배송지 변경 (orderState가 "상품 준비 중" 일 때)
  updateOrder: async (id, changeAddress) => {
    const order = await Orders.findById(id).exec();
    if (order.orderState === orderStates.productReady) {
      const updatedResult = await Orders.updateOne(
        { _id: order._id },
        { address: changeAddress }
      );
      return updatedResult;
    } else {
      console.log(`현재 ${order.orderState} 이므로 수정할 수 없습니다.`);
      return;
    }
  },

  //주문 id 활용해서 주문 취소(삭제) 하기 -> 주문 취소 (orderState가 "상품 준비 중" 일 때)
  deleteOrder: async (id) => {
    const order = await Orders.findById(id).exec();
    if (order.orderState === orderStates.productReady) {
      const deletedResult = await Orders.deleteOne({ _id: order._id });
      return deletedResult;
    } else {
      console.log(`현재 ${order.orderState} 이므로 취소할 수 없습니다.`);
      return;
    }
  },
};

export { ordersService };

//몽고디비에서 ObjectId 가져오는 법
//userId = ObjectId('643e5d487671a822af54ff0f');
//userId = userId.toString();
/*
  //주문 id 활용해서 주문 정보 업데이트 -> 배송지 변경 (orderState가 "상품 준비 중" 일 때)
  updateOrder: async (id, currentAddress, changeAddress) => {
    const order = await Orders.findById(id).exec();
    if (order.orderState === orderStates.productReady) {
      const updatedResult = await Orders.updateOne(
        { _id: order._id, address: currentAddress },
        { $set: { 'address.$': changeAddress } }
      );
      return updatedResult;
    } else {
      console.log(`현재 ${order.orderState} 이므로 수정할 수 없습니다.`);
      return;
    }
    */
