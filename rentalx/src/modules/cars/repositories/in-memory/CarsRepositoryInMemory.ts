import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

export class CreateCarRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

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
