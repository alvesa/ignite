import { Repository, getRepository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ car_id });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({ user_id });

    return openByUser;
  }
  async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO) {
    const rental = this.repository.create({
      expected_return_date,
      car_id,
      user_id,
    });

    await this.repository.save(rental);

    return rental;
  }
}
