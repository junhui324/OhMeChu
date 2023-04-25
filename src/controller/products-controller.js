// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { productsService } from '../service/products-service.js';

const productsController = {
  addProductsList: async (req, res, next) => {
    try {
      const productsAll = req.body; //productsAll은 각 상품 정보(객체)가 담긴 배열을 속성값으로 가짐
      const newProductsAll = await productsService.addProductsList(productsAll);
      res.json(newProductsAll);
    } catch (err) {
      next(err);
    }
  },

  addProduct: async (req, res, next) => {
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

      const productObj = {
        name: name,
        price: price,
        img_url: img_url,
        category: category,
        description: description,
        sub_description: sub_description,
        recommended: recommended,
      };
      const newProduct = await productsService.addProduct(productObj);
      res.json(newProduct);
    } catch (err) {
      next(err);
    }
  },

  updateProductsList: async (req, res, next) => {
    try {
      const { filterField, filterContents, field, contents } = req.body;
      const product = await productsService.updateProductsList(
        filterField,
        filterContents,
        field,
        contents
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { updateField, contents } = req.body;
      const product = await productsService.updateProduct(
        id,
        updateField,
        contents
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productsService.deleteProduct(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  //=======================================================
  //조건(가격, 상품명, 카테고리, 신상품 등)에 따라 상품 get
  getProductsList: async (req, res, next) => {
    try {
      const sortingKey = req.query.sort;
      const productsAll = await productsService.getProductsList(sortingKey);
      res.json(productsAll);
    } catch (err) {
      next(err);
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productsService.getProduct(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  getRecommendedList: async (req, res, next) => {
    try {
      const productsAll = await productsService.getRecommendedList();
      res.json(productsAll);
    } catch (err) {
      next(err);
    }
  },

  getNewProductsList: async (req, res, next) => {
    try {
      const productsAll = await productsService.getNewProductsList();
      res.json(productsAll);
    } catch (err) {
      next(err);
    }
  },

  //추가
};

export { productsController };
