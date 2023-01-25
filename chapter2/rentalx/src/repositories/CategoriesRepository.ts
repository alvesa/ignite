import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });
    this.categories.push(category);
  }

  getAll(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    return this.categories.find((c: Category): boolean => c.name === name);
  }
}
