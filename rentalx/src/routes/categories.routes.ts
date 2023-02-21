import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes: Router = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('', createCategoryController.handle);

categoriesRoutes.get('', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };

