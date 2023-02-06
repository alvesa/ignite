import { Category } from '../model/Category';
import { ICategoriesRepository } from './ICategoriesRepository';

export class PostgresCategoryRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
  list(): Category[] {
    return null;
  }
  create(category: Category): void {
    return null;
  }
}
