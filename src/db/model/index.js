import mongoose from "mongoose";
import {productsSchema} from "../schemas/products.js";

export const Products = mongoose.model("Products", productsSchema);