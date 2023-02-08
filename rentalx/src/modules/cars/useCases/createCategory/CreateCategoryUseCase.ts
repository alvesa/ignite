import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categogoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categogoryAlreadyExists) throw new Error('Category already exists');

    await this.categoriesRepository.create({ name, description });
  }
}
