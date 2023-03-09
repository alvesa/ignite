import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

export class CarsRespository implements ICarsRepository {
  findByLicensePlate(license_plate: string): Promise<Car> {
    throw new Error('Method not implemented.');
  }
  create(data: ICreateCarDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
