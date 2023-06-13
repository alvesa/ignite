import { AppError } from '@errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';

import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe('Send forgot Password to mail', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    await userRepositoryInMemory.create({
      driver_license: '616458',
      email: 'user@example.com',
      name: 'Andrew',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('user@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send email if user does not exist', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('user@example.com')
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');

    await userRepositoryInMemory.create({
      driver_license: '616458',
      email: 'user@example.com',
      name: 'Andrew',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('user@example.com');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
