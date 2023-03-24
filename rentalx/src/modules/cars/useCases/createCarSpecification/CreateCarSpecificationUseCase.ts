import { AppError } from '@errors/AppError';

import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

export class CreateCarSpecificationUseCase {
  constructor(
    // @inject('CarsRespository')
    private carsRespository: ICarsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRespository.findById(car_id);

    if (!carExists) throw new AppError('Car already exists');
  }
}
