import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A3',
      description: 'Test',
      daily_rate: 140.0,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'Audi',
      category_id: '233b6023-df98-461e-8d92-a03b416f0041',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A3',
      description: 'Test',
      daily_rate: 140.0,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'Audi',
      category_id: '233b6023-df98-461e-8d92-a03b416f0041',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Audi',
    });

    expect(cars).toEqual([car]);
  });
});
