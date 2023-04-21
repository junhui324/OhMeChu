//products schema
import { Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    user_point: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export { usersSchema };

/*
Table user {
  _id String             // 유저 id (자동으로 만들어짐-objectId)
	password String        // 유저 비밀번호
  username String        // 유저 이름
  email String           // 이메일
	phone_number String    // 전화 번호
	address String         // 주소
  user_point Number      // 적립금
}
*/
