import { container } from 'tsyringe';

import { Request, Response } from '../../../@types/express/index.d';
import { CreateRentalUseCase } from './CreateRentalUseCase';

export class CreateRentalController {
  async handle(request: Request, response: Response) {
    const { expected_return_date, car_id } = request.body;
    const { id: user_id } = request.user;
    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id,
    });

    return response.status(201).json(rental);
  }
}
