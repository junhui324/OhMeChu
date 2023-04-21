// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Orders } from '../db/model/index.js';

const ordersService = {
  //주문 정보 저장 (구현)
  addOrder: async (
    order_detail,
    user_name,
    phone_number,
    address,
    requirement,
    purchase_amount,
    delivery_fee,
    total_amount,
    order_state
  ) => {
    total_amount = parseInt(purchase_amount) + parseInt(delivery_fee);
    const order = await Orders.create({
      order_detail,
      user_name,
      phone_number,
      address,
      requirement,
      purchase_amount,
      delivery_fee,
      total_amount,
      order_state,
    });
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

  //주문 id 활용해서 주문 정보 업데이트 -> 배송지 변겅 (order_state가 "상품 준비 중" 일 때) order_state를 true false로
  updateOrder: async (id, address) => {
    const order = await Orders.findById(id).exec();
    if (order.order_state) {
      const updatedResult = await Orders.updateOne(
        { _id: order._id },
        { address: address }
      );
      return updatedResult;
    } else {
      //상품 준비 중이 아닐 때, 프론트에서 수정하기 버튼을 아예 없애기..
      //alert로 경고창 띄우기.. -> 에러남
      //현재 아무 일도 안일어남 (에러 x, 수정 x)
      //alert(`현재 ${order.order_state} 이므로 수정할 수 없습니다.`)
      console.log(`현재 ${order.order_state} 이므로 수정할 수 없습니다.`);
      return;
    }
  },

  //주문 id 활용해서 주문 취소(삭제) 하기 -> 주문 취소 (order_state가 "상품 준비 중" 일 때)
  deleteOrder: async (id) => {
    const order = await Orders.findById(id).exec();
    if (order.order_state) {
      const deletedResult = await Orders.deleteOne({ _id: order._id });
      return deletedResult;
    } else {
      //상품 준비 중이 아닐 때, 프론트에서 취소하기 버튼을 아예 없애기..
      //현재 아무 일도 안일어남 (에러 x, 삭제 x)
      console.log(`현재 ${order.order_state} 이므로 취소할 수 없습니다.`);
      return;
    }
  },
};

export { ordersService };

//몽고디비에서 ObjectId 가져오는 법
//userId = ObjectId('643e5d487671a822af54ff0f');
//userId = userId.toString();
/*
updateOrder: async (id) => {
  const order = await Orders.findByIdAndUpdate(id, {
    new: true, //업데이트 후의 바뀐 정보 받아볼 수 있음
    address: '업데이트 테스트',
  });
  return order;
},
*/
