import mongoose from 'mongoose';
import { productsSchema } from '../schemas/products.js';
import { ordersSchema } from '../schemas/orders.js';

export const Products = mongoose.model('Products', productsSchema);
export const Orders = mongoose.model('Orders', ordersSchema);
