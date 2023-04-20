// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { productsService } from "../service/products-service.js";

const productsController = {
  addProductsList: async (req, res, next) => {
    try{
      const productsAll = req.body; //productsAll은 각 상품 정보(객체)가 담긴 배열을 속성값으로 가짐
      const newProductsAll = await productsService.addProductsList(productsAll);
      res.json(newProductsAll);
    } catch (err) {
      next(err);
    };    
  },

  addProduct: async (req, res, next) => {
    try{
      const {name, price, img_url, category, description, sub_description, recommended} = req.body;
      const newProduct = await productsService.addProduct(
        name, 
        price, 
        img_url, 
        category, 
        description, 
        sub_description, 
        recommended
      );
      res.json(newProduct);
    } catch (err) {
      next(err);
    };    
  },

  updateProductsList: async (req, res, next) => {
    try{
      const {rangeField, range, field, contents} = req.body;
      const product = await productsService.updateProductsList(rangeField, range, field, contents);
      res.json(product);
    } catch (err) {
      next(err);
    };
  },

  updateProduct: async (req, res, next) => {
    try{
      const {id} = req.params;
      const {updateField, contents} = req.body;
      const product = await productsService.updateProduct(id, updateField, contents);
      res.json(product);
    } catch (err) {
      next(err);
    };
  },

  deleteProduct: async (req, res, next) => {
    try{
      const {id} = req.params;
      const product = await productsService.deleteProduct(id);
      res.json(product);
    } catch (err) {
      next(err);
    };
  },

  getProductsList: async (req, res, next) => {
    try{
      const productsAll = await productsService.getProductsList();
      res.json(productsAll);
    } catch (err) {
      next(err);
    };
  },

  getProduct: async (req, res, next) => {
    try{
      const {id} = req.params;
      const product = await productsService.getProduct(id);
      res.json(product);
    } catch (err) {
      next(err);
    };
  },
//추가
};

export {productsController};