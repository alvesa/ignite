import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoryRepository = new CategoriesRepository();

const categoriesRoutes: Router = Router();

const categoryAlreadyExists = (req, res, next) => {
  const { name } = req.body;
  const categogoryAlreadyExists = categoryRepository.findByName(name);

  if (categogoryAlreadyExists)
    return res.status(400).json({ message: 'Category already exists' });

  return next();
};

categoriesRoutes.post('', categoryAlreadyExists, (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('', (request, response) => {
  return response.status(200).json(categoryRepository.list());
});

export { categoriesRoutes };
