import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const avatarFile = null;

    await updateUserAvatarUseCase.execute({ user_id: id, avatarFile });

    return response.status(204).send();
  }
}
