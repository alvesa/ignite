import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`User or password incorrect`, 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(`User or password incorrect`, 401);
    }

    const token = sign({ email, user_id: user.id }, 'asfsdf321dfa321', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
