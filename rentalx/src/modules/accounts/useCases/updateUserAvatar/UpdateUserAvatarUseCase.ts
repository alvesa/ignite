import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}
  async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
