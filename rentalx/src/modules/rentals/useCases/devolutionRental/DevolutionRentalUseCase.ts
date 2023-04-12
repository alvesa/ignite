import { inject } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  id: string;
  user_id: string;
}
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider') private dateProvider: IDateProvider
  ) {}
  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental not found');
    }

    const dateNow = this.dateProvider.dateNow();

    const diffInHours = this.dateProvider.compareInHours(dateNow, rental.expected_return_date);

    if(diffInHours < ) {}
  }
}
