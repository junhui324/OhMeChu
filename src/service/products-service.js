// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Products } from "../db/model/index.js";


const productsService = {
  addProductsList: async (arr) => {
    const addProductsList = await Products.create(arr);
    return addProductsList;
  },

  addProduct: async (name, price, img_url, category, description, sub_description, recommended) => {
    const addProduct = await Products.create({
      name, 
      price, 
      img_url, 
      category, 
      description, 
      sub_description, 
      recommended
    });
    return addProduct;
  },
  
  updateProductsList: async(filterField, filterContents, field, contents) => {
    const product = await Products.updateMany({[filterField]: filterContents}, {[field]: contents}); //rangeField: 조건(카테고리 등)
    return product;      
  },

  updateProduct: async(id, updateField, contents) => { //field는 객체
    const product = await Products.findByIdAndUpdate(id, {[updateField]: contents});
    return product;
  },

  deleteProduct: async(id) => {
    const product = await Products.findByIdAndDelete(id);
    return product;      
  },

  getProductsList: async () => {
    const productsAll = await Products.find({});
    return productsAll;  
  },

  getProduct: async (id) => {
    const product = await Products.findById(id);
    return product;
  },

  getRecommendedList: async () => {
    const productsAll = await Products.find({recommended: 1})
                                      .limit(12);
    return productsAll;
  },

  getNewProductsList: async () => {
    const productsAll = await Products.find({}).sort({createdAt: -1})
                                               .limit(12);
    return productsAll;
  },
  
};

export {productsService};