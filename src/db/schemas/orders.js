//order schema
import { Schema } from 'mongoose';

const ordersSchema = new Schema(
  {
    orderDetail: {
      //상품 id, 해당 상품 수량(문자열로 저장되니 추후 parseInt로 바꿔서 써야합니다)
      type: [String, Number],
      default: ['', 0],
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
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    purchaseAmount: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    orderState: {
      //"상품 준비 중" 일 때만 "배송지 수정 / 주문 취소" 가능
      type: String,
      required: true,
      default: '상품 준비 중',
    },
  },
  { timestamps: true },
  { versionKey: false }
);

export { ordersSchema };
/*
{
    "user_name": "장준희",
    "phone_number": "01012345678",
    "address": "전주시 덕진구",
    "requirement": "문 앞에 놓아주세요",
    "purchase_amount": "30000",
    "delivery_fee": "5000",
    "total_amount": "35000",
    "order_state": "배송 준비 중"
}
*/
