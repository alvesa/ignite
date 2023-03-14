import { CreateCarRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let createCarRepository: CreateCarRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    createCarRepository = new CreateCarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(createCarRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Name',
      daily_rate: 300,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should be able to create a new car with existing license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car Name',
        description: 'Car Name',
        daily_rate: 300,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Car Brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car Name',
        description: 'Car Name',
        daily_rate: 300,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Car Brand',
        category_id: 'category',
      });
    }).rejects.toThrow();
  });

  it('shold be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Name',
      description: 'Car Name',
      daily_rate: 300,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Car Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
