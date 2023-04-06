import { AppError } from '@errors/AppError';

import { IRentalRepository } from '../repositories/IRentalRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalRepository) {}
  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for this user');
    }
  }
}
