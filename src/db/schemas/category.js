//products schema
import { Schema } from 'mongoose';

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
});

export { categorySchema };
