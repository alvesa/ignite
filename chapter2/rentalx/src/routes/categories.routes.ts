import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

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
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoryRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).json();
});

categoriesRoutes.get('', (request, response) => {
  return response.status(200).json(categoryRepository.list());
});

export { categoriesRoutes };

