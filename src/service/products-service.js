// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Products } from '../db/model/index.js';
//import fs from 'fs';
//import { fromByteArray } from 'base-64';
//import { Base64 } from 'js-base64';

const descSort = -1;
const ascSort = 1;

const category = {
  korean: 'korean',
  chinese: 'chinese',
  western: 'western',
  japanese: 'japanese',
};

const sortMap = new Map([
  ['best', { recommended: descSort }],
  ['latest', { createdAt: descSort }],
  ['highPrice', { price: descSort }],
  ['lowPrice', { price: ascSort }],
  ['descName', { name: descSort }],
  ['ascName', { name: ascSort }],
]);

const categoryMap = new Map([
  ['korean', async () => Products.find({ category: category.korean })],
  ['chinese', async () => Products.find({ category: category.chinese })],
  ['western', async () => Products.find({ category: category.western })],
  ['japanese', async () => Products.find({ category: category.japanese })],
]);

const productsService = {
  //관리자 - 상품 여러개 추가
  addProductsList: async (arr) => {
    const addProductsList = await Products.create(arr);
    return addProductsList;
  },

  //관리자 - 상품 하나 추가 (이미지 추가해보기.. ㅠ)
  addProduct: async (productObj) => {
    //이미지 파일 읽기
    //const bitmap = fs.readFileSync('../../img/image1.png');
    //const buffer = new Uint8Array(bitmap);
    //const encodedString = Base64.fromUint8Array(buffer);
    //console.log(encodedString);
    /*
    const addProduct = await Products.create({
      name: productObj.name,
      price: productObj.price,
      img: encodedString,
      category: productObj.category,
      description: productObj.description,
      sub_description: productObj.sub_description,
      recommended: productObj.recommended,
    });
    */
    const addProduct = await Products.create(productObj);
    return addProduct;
  },

  //관리자 - 상품 정보 여러개 업데이트
  updateProductsList: async (filterField, filterContents, field, contents) => {
    const product = await Products.updateMany(
      { [filterField]: filterContents },
      { [field]: contents }
    ); //rangeField: 조건(카테고리 등)
    return product;
  },

  //관리자 - 상품 정보 업데이트 (ex) 카테고리 수정)
  updateProduct: async (id, updateField, contents) => {
    //field는 객체
    const product = await Products.findByIdAndUpdate(id, {
      [updateField]: contents,
    });
    return product;
  },

  //관리자 - 상품 삭제
  deleteProduct: async (id) => {
    const product = await Products.findByIdAndDelete(id);
    return product;
  },

  //===================================================================
  //조건에 따라 상품 get
  getProductsList: async (sortingKey = 'recommended') => {
    let sortField = sortMap.get(sortingKey) || {};
    const categoryFunction = categoryMap.get(sortingKey);
    if (categoryFunction) {
      return await categoryFunction();
    }
    const productsAll = await Products.find({}).sort(sortField);
    return productsAll;
  },

  getProduct: async (id) => {
    const product = await Products.findById(id);
    return product;
  },

  getRecommendedList: async () => {
    const productsAll = await Products.find({}).sort({ recommended: -1 });
    return productsAll;
  },

  getNewProductsList: async () => {
    const productsAll = await Products.find({}).sort({ createdAt: -1 });
    return productsAll;
  },
};

export { productsService };
