import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    const list = this.categories;
    return list;
  }
  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { description, name });

    this.categories.push(category);
  }
}
