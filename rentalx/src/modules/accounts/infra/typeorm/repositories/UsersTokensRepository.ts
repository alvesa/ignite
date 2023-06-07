import { Repository, getRepository } from 'typeorm';

import { IUsersTokensDTO } from '@modules/accounts/dtos/ICreateUsersTokensDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UsersTokens } from '../entities/UserTokens';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  contructor() {
    this.repository = getRepository(UsersTokens);
  }
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IUsersTokensDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
