import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
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

    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);
    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}
