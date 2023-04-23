//products schema
import { Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    src: {
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
