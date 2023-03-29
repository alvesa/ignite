import { container } from 'tsyringe';

import { Request, Response } from '../../../../@types/express/index.d';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

export class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(cars);
  }
}
