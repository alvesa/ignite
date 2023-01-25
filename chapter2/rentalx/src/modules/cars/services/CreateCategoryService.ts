import { Category } from '../model/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categogoryAlreadyExists: Category =
      this.categoryRepository.findByName(name);

    if (categogoryAlreadyExists) throw new Error('Category already exists');

    this.categoryRepository.create({ name, description });
  }
}
