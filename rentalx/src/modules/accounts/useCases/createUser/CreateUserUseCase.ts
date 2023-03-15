import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private readonly usersRepository: IUserRepository
  ) {}

  async execute({ name, email, password, driver_license }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError(`User ${email} already exists`);

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
