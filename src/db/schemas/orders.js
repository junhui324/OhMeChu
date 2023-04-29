//order schema
import { Schema } from 'mongoose';

const ordersSchema = new Schema(
  {
    orderDetail: {
      //상품 id, 해당 상품 수량(문자열로 저장되니 추후 parseInt로 바꿔서 써야합니다)
      //[{id: id, amount: 2}, {id: id, amount: 3}]
      type: Array,
      required: true,
    },
    email: {
      type: String,
      default: null,
    },
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    purchaseAmount: {
      type: String,
      required: true,
    },
    deliveryFee: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
      default: 0,
    },
    orderState: {
      //"배송준비중" 일 때만 "배송지 수정 / 주문 취소" 가능
      type: String,
      required: true,
      default: '배송준비중',
    },
  },
  { timestamps: true },
  { versionKey: false }
);

export { ordersSchema };
