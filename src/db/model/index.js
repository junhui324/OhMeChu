import mongoose from 'mongoose';
import { productsSchema } from '../schemas/products.js';
import { ordersSchema } from '../schemas/orders.js';
import { usersSchema } from '../schemas/users.js';
import { categorySchema } from '../schemas/category.js';
import { refreshTokenSchema } from '../schemas/auth.js';

export const Products = mongoose.model('Products', productsSchema);
export const Orders = mongoose.model('Orders', ordersSchema);
export const Users = mongoose.model('Users', usersSchema);
export const Category = mongoose.model('Category', categorySchema);
export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
