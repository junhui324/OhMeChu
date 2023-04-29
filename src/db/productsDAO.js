import { Products } from './model/index.js';

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

const productsDAO = {
  //관리자 - 상품 여러개 추가
  createProducts: async (arr) => {
    const addProductsList = await Products.create(arr);
    return addProductsList;
  },

  //관리자 - 상품 정보 여러개 업데이트
  updateProductsMany: async (filterField, filterContents, field, contents) => {
    const product = await Products.updateMany(
      { [filterField]: filterContents },
      { [field]: contents }
    ); //rangeField: 조건(카테고리 등)
    return product;
  },

  //관리자 - 상품 정보 업데이트 (ex) 카테고리 수정)
  findProductByIdAndUpdate: async (id, updateField, contents) => {
    //field는 객체
    const product = await Products.findByIdAndUpdate(id, {
      [updateField]: contents,
    });
    return product;
  },

  //관리자 - 상품 삭제
  findProductByIdAndDelete: async (id) => {
    const product = await Products.findByIdAndDelete(id);
    return product;
  },

  //===================================================================
  //조건에 따라 상품 get
  findProductsAndSortByKey: async (sortingKey) => {
    let sortField = sortMap.get(sortingKey) || {};
    const categoryFunction = categoryMap.get(sortingKey);
    if (categoryFunction) {
      return await categoryFunction();
    }
    const productsAll = await Products.find({}).sort(sortField);
    return productsAll;
  },

  findProductById: async (id) => {
    const product = await Products.findById(id);
    return product;
  },

  findProductsAndSort: async (sortField) => {
    const productsAll = await Products.find({}).sort({ [sortField]: -1 });
    return productsAll;
  },
};

export { productsDAO };
