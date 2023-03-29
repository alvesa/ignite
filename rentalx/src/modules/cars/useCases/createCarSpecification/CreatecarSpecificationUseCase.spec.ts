import { AppError } from '@errors/AppError';
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationInMemory';

import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRespository: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationRepository: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRespository = new CarsRepositoryInMemory();
    specificationRepository = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRespository,
      specificationRepository
    );
  });

  it('should be able to to add a new specification to a non existing car', async () => {
    expect(async () => {
      const car_id = '123456';
      const specifications_id = ['54321'];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to to add a new specification to the car', async () => {
    const car = await carsRespository.create({
      name: 'Name',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category_id',
    });

    const specification = await specificationRepository.create({
      description: 'test',
      name: 'test',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
