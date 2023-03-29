import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRespository')
    private carsRespository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRespository.findById(car_id);

    if (!carExists) throw new AppError('Car already exists');

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRespository.create(carExists);

    return carExists;
  }
}
