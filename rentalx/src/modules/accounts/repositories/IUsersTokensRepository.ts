import { IUsersTokensDTO } from '../dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '../infra/typeorm/entities/UserTokens';

export interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: IUsersTokensDTO): Promise<UsersTokens>;
}
