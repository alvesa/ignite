import { container } from 'tsyringe';

import { Request, Response } from '../../../../@types/express/index.d';
import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);

    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = request.body;

    const car = await createCarUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return response.status(201).json(car);
  }
}
