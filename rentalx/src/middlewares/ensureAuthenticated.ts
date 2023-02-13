import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    throw new Error('Token missing from request');
  }

  const [, token] = autheHeader.split(' ');

  try {
    const { user_id } = verify(token, 'asfsdf321dfa321') as IPayload;
    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error(`User does not exists`);
    }

    next();
  } catch (err) {
    throw new Error('Invalid token');
  }
}
