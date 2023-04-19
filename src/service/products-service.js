// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Products } from "../db/model/index.js";


const productsService = {
  getProductsList: async () => {
    const allProducts = await Products.find({});
    return allProducts;  
  },
  getProduct: async (id) => {
    const product = await Products.find({id});
    return product;  
  },
};

export {productsService};