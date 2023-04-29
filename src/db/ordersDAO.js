import { Orders } from './model/index.js';
import { Users } from './model/index.js';

// 주문 상태 문자열 열거형
const orderStates = {
  //productReady: '상품 준비 중',
  deliveryReady: '배송준비중',
  courierDelivery: '배송중',
  deliveryCompleted: '배송완료',
};

const ordersDAO = {
  //주문 정보 저장 (구현)
  createOrder: async (orderObj) => {
    const purchaseAmount = orderObj.purchaseAmount.replace(',', '');
    const deliveryFee = orderObj.deliveryFee.replace(',', '');
    orderObj.totalAmount = (
      parseInt(purchaseAmount) + parseInt(deliveryFee)
    ).toLocaleString('ko-KR');
    const order = await Orders.create(orderObj);
    if (orderObj.email) {
      await Users.updateOne(
        { email: orderObj.email },
        { $push: { orderNumber: order._id } }
      );
    }
    return order;
  },

  //주문 정보 리스트 불러오기 (구현)
  findOrdersMany: async () => {
    const allOrders = await Orders.find({});
    return allOrders;
  },

  //주문 id 활용해서 주문 정보 하나 불러오기 (구현)
  findOrderById: async (id) => {
    const order = await Orders.findById(id);
    return order;
  },

  //주문 id 활용해서 해당 주문 내역 배송 상태 수정하기 (관리자 기능)
  updateOrderStateById: async (id, orderState) => {
    const order = await Orders.findByIdAndUpdate(id, {
      orderState: orderState,
    });
    return order;
  },

  //주문 id 활용해서 주문 정보 업데이트
  updateOrderById: async (id, userName, phoneNumber, requirement, address) => {
    const order = await Orders.findById(id).exec();
    if (order.orderState === orderStates.deliveryReady) {
      const updatedResult = await Orders.updateMany(
        { _id: order._id },
        {
          userName: userName,
          phoneNumber: phoneNumber,
          requirement: requirement,
          address: address,
        }
      );
      return updatedResult;
    } else {
      return `현재 ${order.orderState} 이므로 수정할 수 없습니다.`;
    }
  },

  //주문 id 활용해서 주문 취소(삭제) 하기 -> 주문 취소 (orderState가 "배송준비중" 일 때)
  deleteOrderById: async (id, email) => {
    const order = await Orders.findById(id).exec();
    if (order.orderState === orderStates.deliveryReady) {
      if (email) {
        const deletedResult = await Orders.deleteOne({
          _id: order._id,
          email: email,
        });
        await Users.updateOne(
          { email: email },
          { $pull: { orderNumber: order._id } }
        );
        return deletedResult;
      } else {
        const deletedResult = await Orders.deleteOne({ _id: order._id });
        return deletedResult;
      }
    } else {
      return `현재 ${order.orderState} 이므로 수정할 수 없습니다.`;
    }
  },
};

export { ordersDAO };
