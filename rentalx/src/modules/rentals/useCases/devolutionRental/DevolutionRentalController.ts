import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IBaseController } from '@shared/controller/IBaseController';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

export class DevolutionRentalController implements IBaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).json(rental);
  }
}
