import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

export class ListCarsUseCase {
  constructor(private carsRespository: ICarsRepository) {}
  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRespository.findAvailable(
      brand,
      category_id,
      name
    );

    return cars;
  }
}
