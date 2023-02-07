import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categogoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categogoryAlreadyExists) throw new Error('Category already exists');

    await this.categoryRepository.create({ name, description });
  }
}
