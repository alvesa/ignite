import { inject } from 'tsyringe';

import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';

export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalRepository
  ) {}

  async execute(user_id: string) {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}
