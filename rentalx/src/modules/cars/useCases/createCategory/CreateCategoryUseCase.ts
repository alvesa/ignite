import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categogoryAlreadyExists: Category =
      this.categoryRepository.findByName(name);

    if (categogoryAlreadyExists) throw new Error('Category already exists');

    this.categoryRepository.create({ name, description });
  }
}
