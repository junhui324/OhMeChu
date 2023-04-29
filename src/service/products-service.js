// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { productsDAO } from '../db/productsDAO.js';

const productsService = {
  //관리자 - 상품 여러개 추가
  addProductsList: async (arr) => {
    const addProductsList = await productsDAO.createProducts(arr);
    return addProductsList;
  },

  //관리자 - 상품 하나 추가
  addProduct: async (productObj) => {
    const addProduct = await productsDAO.createProducts(productObj);
    return addProduct;
  },

  //관리자 - 상품 정보 여러개 업데이트
  updateProductsList: async (filterField, filterContents, field, contents) => {
    const product = await productsDAO.updateProductsMany(
      filterField,
      filterContents,
      field,
      contents
    ); //rangeField: 조건(카테고리 등)
    return product;
  },

  //관리자 - 상품 정보 업데이트 (ex) 카테고리 수정)
  updateProduct: async (id, updateField, contents) => {
    //field는 객체
    const product = await productsDAO.findProductByIdAndUpdate(
      id,
      updateField,
      contents
    );
    return product;
  },

  //관리자 - 상품 삭제
  deleteProduct: async (id) => {
    const product = await productsDAO.findProductByIdAndDelete(id);
    return product;
  },

  //===================================================================
  //조건에 따라 상품 get
  getProductsList: async (sortingKey) => {
    const productsAll = await productsDAO.findProductsAndSortByKey(sortingKey);
    return productsAll;
  },

  getProduct: async (id) => {
    const product = await productsDAO.findProductById(id);
    return product;
  },

  getSortedProductsList: async (sortfield) => {
    const productsAll = await productsDAO.findProductsAndSort(sortfield);
    return productsAll;
  },
};

export { productsService };
