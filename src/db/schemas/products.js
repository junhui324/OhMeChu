//products schema
import { Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '설명이 없습니다.',
    },
    subDescription: {
      type: [String],
      default: ['미지정', '미지정', '미지정'],
    },
    recommended: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export { productsSchema };
