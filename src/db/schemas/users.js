//users schema
import { Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    userName: {
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
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      default: '기타',
    },
    birth: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    userPoint: {
      type: String,
      required: true,
      default: 0,
    },
    orderNumber: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

export { usersSchema };
