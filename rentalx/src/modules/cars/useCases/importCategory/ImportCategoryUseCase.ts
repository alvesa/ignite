import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../infra/typeorm/repositories/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) {}

  loadCategorues(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          resolve(categories);
          fs.promises.unlink(file.path);
        })
        .on('error', (err) => reject(err));
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategorues(file);
    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({ name, description });
      }

      return category;
    });
  }
}
