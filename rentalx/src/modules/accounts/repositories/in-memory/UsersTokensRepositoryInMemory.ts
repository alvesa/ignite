import { IUsersTokensDTO } from '@modules/accounts/dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UsersTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IUsersTokensDTO): Promise<UsersTokens> {
    const userTokens = new UsersTokens();

    Object.assign(userTokens, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userTokens);

    return userTokens;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (t) => t.refresh_token === refresh_token
    );

    return userToken;
  }
}
