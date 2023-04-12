import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

import { Rental } from '../../entities/Rental';

export class RentalsRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];
  async findById(id: string): Promise<Rental> {
    return this.rentals.find((x) => x.id === id);
  }
  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO) {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === userId && !rental.end_date
    );
  }
}
