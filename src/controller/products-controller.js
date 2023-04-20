// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { productsService } from '../service/products-service.js';

const productsController = {
  //상품 한 개 등록 (구현)
  addProductOne: async (req, res, next) => {
    try {
      const {
        name,
        price,
        img_url,
        category,
        description,
        sub_description,
        recommended,
      } = req.body;
      const product = await productsService.addProductOne(
        name,
        price,
        img_url,
        category,
        description,
        sub_description,
        recommended
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  //상품 여러개 등록 (구현)
  addProducts: async (req, res, next) => {
    try {
      const arr = req.body;
      const products = await productsService.addProducts(arr);
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  //상품 id 활용해서 해당 상품만 불러오기 (구현)
  getProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productsService.getProduct(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  //===========================================================

  //모든 상품 불러오기 & 상품 정렬해서 불러오기 (구현)
  getProductsSort: async (req, res, next) => {
    try {
      const { page } = req.body;
      const { sort } = req.query;
      if (!sort) {
        const products = await productsService.getProductsList();
        res.json(products);
      } else if (sort === 'highPrice') {
        //가격 내림차순
        const products = await productsService.getProductsPriceDesc(page);
        res.json(products);
      } else if (sort === 'rowPrice') {
        //가격 오름차순
        const products = await productsService.getProductsPriceAsc(page);
        res.json(products);
      } else if (sort === 'descName') {
        //이름 내림차순
        const products = await productsService.getProductsNameDesc(page);
        res.json(products);
      } else if (sort === 'ascName') {
        //이름 오름차순
        const products = await productsService.getProductsNameAsc(page);
        res.json(products);
      }
    } catch (err) {
      next(err);
    }
  },

  //===========================================================

  // 상품 정보의 필드 여러개 수정 (인자를 여러개 줘야함.. 어케 고칠 수 있을 까?)
  updateProductsList: async (req, res, next) => {
    try {
      const { category, name, price, contents } = req.body;
      const product = await productsService.updateProductsList(
        category,
        name,
        price,
        contents
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  //상품 id 활용해서 해당 상품 정보 업데이트 (구현 but, 기능 추가해야함. 특정 조건 맞춰서 업데이트 하기 등)
  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { updateFiled, contents } = req.body;
      const product = await productsService.updateProduct(
        id,
        updateFiled,
        contents
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  //상품 id 활용해서 해당 상품 삭제 (구현)
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productsService.deleteProduct(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  //추가
};

export { productsController };
