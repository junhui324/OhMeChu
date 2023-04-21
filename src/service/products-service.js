// 비즈니스 로직을 수행하는 코드 -> controller로 전달

import { Products } from '../db/model/index.js';

const productsService = {
  //상품 한 개 등록 (구현)
  addProductOne: async (
    name,
    price,
    img_url,
    category,
    description,
    sub_description,
    recommended
  ) => {
    const product = await Products.create({
      name,
      price,
      img_url,
      category,
      description,
      sub_description,
      recommended,
    });
    return product;
  },

  //상품 여러개 등록 (구현)
  addProducts: async (arr) => {
    const products = await Products.create(arr);
    return products;
  },

  //모든 상품 불러오기 (구현)
  getProductsList: async () => {
    const allProducts = await Products.find({});
    return allProducts;
  },

  //상품 id 활용해서 해당 상품만 불러오기 (구현)
  getProduct: async (id) => {
    const product = await Products.findById(id);
    return product;
  },

  //상품 가격 높은 순 정렬 (내림차순) 3 -> 2 -> 1
  getProductsPriceDesc: async (page) => {
    const products = await Products.find({})
      .sort({ price: -1 })
      .skip((page - 1) * 2)
      .limit(2);
    return products;
  },

  //상품 가격 낮은 순 정렬 (오름차순) 1 -> 2 -> 3
  getProductsPriceAsc: async (page) => {
    const products = await Products.find({})
      .sort({ price: 1 })
      .skip((page - 1) * 2)
      .limit(2);
    return products;
  },

  //상품명 순 정렬 (내림차순) ㄷ -> ㄴ -> ㄱ / c- > b -> a
  getProductsNameDesc: async (page) => {
    const products = await Products.find({})
      .sort({ name: -1 })
      .skip((page - 1) * 2)
      .limit(2);
    return products;
  },

  //상품명 순 정렬 (오름차순) ㄱ -> ㄴ -> ㄷ / a -> b -> c
  getProductsNameAsc: async (page) => {
    const products = await Products.find({})
      .sort({ name: 1 })
      .skip((page - 1) * 2)
      .limit(2);
    return products;
  },

  //신상품 순 정렬

  //판매 인기순 정렬

  // 상품 정보의 필드 여러개 수정 (인자를 여러개 줘야함.. 어케 고칠 수 있을 까?)
  updateProductsList: async (category, name, price, contents) => {
    const product = await Products.updateMany(
      { [category]: name },
      { [price]: contents }
    ); //조건(카테고리, 가격 등)
    return product;
  },

  //상품 id 활용해서 해당 상품 정보 업데이트
  updateProduct: async (id, updateField, contents) => {
    const product = await Products.findByIdAndUpdate(id, {
      [updateField]: contents,
    });
    return product;
  },

  //상품 id 활용해서 해당 상품 삭제
  deleteProduct: async (id) => {
    const product = await Products.findByIdAndDelete(id);
    return product;
  },
};

export { productsService };

/*포스트맨 body req에 넣어 줄 json형식 데이터 
{
      "name": "떡볶이 밀키트",
      "price": 12000,
      "img_url": "src/image/1",
      "category": "한식",
      "description": "맵단짠 떡볶이입니다.",
      "sub_description": ["3인분", "30분", "매운맛"],
      "recommended": 0
}
*/
