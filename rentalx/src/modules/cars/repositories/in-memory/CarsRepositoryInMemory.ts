import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async findById(id: string): Promise<Car> {
    return this.cars.find((x) => x.id === id);
  }
  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const all = this.cars.filter((car) => {
      if (
        car.available ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });

    return all;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((x) => x.license_plate === license_plate);
  }
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      ...data,
    });

    this.cars.push(car);

    return car;
  }
}
