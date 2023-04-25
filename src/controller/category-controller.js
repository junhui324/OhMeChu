// req 객체를 받아 service에 요청을 전달
// service에서 res를 받아 Front에 최종 응답
import { categoryService } from '../service/category-service.js';

const categoryController = {
  getCategory: async (req, res, next) => {
    try {
      const order = await categoryService.getCategory();
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  addCategory: async (req, res, next) => {
    try {
      const { category } = req.body;
      const addCategory = await categoryService.addCategory(category);
      res.json(addCategory);
    } catch (err) {
      next(err);
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { category } = req.body;
      const updateCategory = await categoryService.updateCategory(id, category);
      res.json(updateCategory);
    } catch (err) {
      next(err);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoryService.deleteCategory(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  },
};

export { categoryController };
