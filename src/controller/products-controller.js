// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { productsService } from "../service/products-service.js";

const productsController = {
  getProductsList: async (req, res, next) => {
    try{
      const products = await productsService.getProductsList();
      res.json(products);
    } catch (err) {
      next(err);
    };
  },
//추가
};

export {productsController};