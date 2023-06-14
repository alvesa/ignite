import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@errors/AppError';

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
    const { user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
