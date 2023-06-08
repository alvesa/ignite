import { IUsersTokensDTO } from '../dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '../infra/typeorm/entities/UserTokens';

export interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: IUsersTokensDTO): Promise<UsersTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens>;

  deleteById(id: string): Promise<void>;
}
