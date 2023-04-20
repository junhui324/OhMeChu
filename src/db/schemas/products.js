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
    img_url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: '한식',
    },
    description: {
      type: String,
    },
    sub_description: {
      type: [String],
      default: ['0인분', '0분', '?'],
    },
    recommended: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

export { productsSchema };
