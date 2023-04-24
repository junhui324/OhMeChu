import { Router } from 'express';
import { categoryController } from '../controller/category-controller.js';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategory);

categoryRouter.post('/', categoryController.addCategory);

categoryRouter.put('/:id', categoryController.updateCategory);

categoryRouter.delete('/:id', categoryController.deleteCategory);

export { categoryRouter };
