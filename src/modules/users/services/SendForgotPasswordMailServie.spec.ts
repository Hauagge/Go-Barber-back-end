import AppError from '@shared/erros/AppErros';
import FakeMailProvider from '@shared/container/providers/mailProvider/fakes/fakeMailProvider';
import FakeUserTokenRepositry from '../repositories/fakes/fakeUserTokenRepository';
import FakeUserRepositry from '../repositories/fakes/fakeUserRepository';

import SendForgotPasswordEmail from './SendForgotPasswordMailServie';

let fakeUserRepositry: FakeUserRepositry;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepositry;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepositry = new FakeUserRepositry();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepositry();

    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepositry,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });
  it('should be able to  recover  the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepositry.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@email.com',
    });
    expect(sendMail).toHaveBeenCalled();
  });

  it('sould not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to  recover  the password using email', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepositry.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@email.com',
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
