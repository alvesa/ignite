import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

import { Rental } from '../../entities/Rental';

export class RentalsRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === userId && rental.end_date === null
    );
  }
}
