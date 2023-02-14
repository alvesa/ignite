import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  user_id: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const autheHeader = request.headers.authorization;

  if (!autheHeader) {
    throw new AppError('Token missing from request', 401);
  }

  const [, token] = autheHeader.split(' ');

  try {
    const { user_id } = verify(token, 'asfsdf321dfa321') as IPayload;
    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(`User does not exists`, 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
