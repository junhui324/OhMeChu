//products schema
import { Schema } from "mongoose";

const productsSchema = new Schema({
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
  },
  description: {
    type: String,
  },
  sub_description: {
    type: [String],
  },
  recommended: {
    type: Number,
  }
}, {timestamps: true});

export {productsSchema};