// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Products } from '../db/model/index.js';

const descSort = -1;
const ascSort = 1;

const sortKey = {
  best: 'best',
  latest: 'latest',
  highPrice: 'highPrice',
  lowPrice: 'lowPrice',
  descName: 'descName',
  ascName: 'ascName',
};

const category = {
  korean: 'korean',
  chinese: 'chinese',
  western: 'western',
  japanese: 'japanese',
};

const productsService = {
  //관리자
  addProductsList: async (arr) => {
    const addProductsList = await Products.create(arr);
    return addProductsList;
  },
  //관리자
  addProduct: async (productObj) => {
    const addProduct = await Products.create({
      productObj,
    });
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
  //관리자
  deleteProduct: async (id) => {
    const product = await Products.findByIdAndDelete(id);
    return product;
  },

  //===================================================================
  //조건에 따라 상품 get
  getProductsList: async (sortingKey = 'recommended') => {
    let sortField = {}; //db에 판매량 추가 시, default를 판매량으로 변경 예정(후순위 고려사항)
    if (sortKey.best === sortingKey) {
      sortField = { recommended: descSort };
    }
    if (sortKey.latest === sortingKey) {
      sortField = { createdAt: descSort };
    }
    if (sortKey.highPrice === sortingKey) {
      sortField = { price: descSort };
    }
    if (sortKey.lowPrice === sortingKey) {
      sortField = { price: ascSort };
    }
    if (sortKey.descName === sortingKey) {
      sortField = { name: descSort };
    }
    if (sortKey.ascName === sortingKey) {
      sortField = { name: ascSort };
    }
    if (category.korean === sortingKey) {
      const koreanProducts = await Products.find({ category: category.korean });
      return koreanProducts;
    }
    if (category.chinese === sortingKey) {
      const chineseProducts = await Products.find({
        category: category.chinese,
      });
      return chineseProducts;
    }
    if (category.western === sortingKey) {
      const westernProducts = await Products.find({
        category: category.western,
      });
      return westernProducts;
    }
    if (category.japanese === sortingKey) {
      const japaneseProducts = await Products.find({
        category: category.japanese,
      });
      return japaneseProducts;
    }
    const productsAll = await Products.find({}).sort(sortField);
    return productsAll;
  },

  getProduct: async (id) => {
    const product = await Products.findById(id);
    return product;
  },

  getRecommendedList: async () => {
    const productsAll = await Products.find({ recommended: 1 }).limit(12);
    return productsAll;
  },

  getNewProductsList: async () => {
    const productsAll = await Products.find({})
      .sort({ createdAt: -1 })
      .limit(12);
    return productsAll;
  },
};

export { productsService };
