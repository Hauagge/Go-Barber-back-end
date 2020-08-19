import AppError from '@shared/erros/AppErros';
import FakeUserTokenRepositry from '../repositories/fakes/fakeUserTokenRepository';
import FakeUserRepositry from '../repositories/fakes/fakeUserRepository';
import FakeHashProvider from '../providers/hashProviders/fakes/fakeHashrovider';

import ResetPasswordService from './ResetPasswordService';

let fakeUserRepositry: FakeUserRepositry;
let fakeUserTokenRepository: FakeUserTokenRepositry;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepositry = new FakeUserRepositry();
    fakeUserTokenRepository = new FakeUserTokenRepositry();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUserRepositry,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to  reset  the password ', async () => {
    const user = await fakeUserRepositry.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generatHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updtadeUser = await fakeUserRepositry.findById(user.id);

    expect(generatHash).toHaveBeenCalledWith('123123');
    expect(updtadeUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with a non-existing token ', async () => {
    await expect(
      resetPassword.execute({
        token: 'none',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with a non-existing user ', async () => {
    const { token } = await fakeUserTokenRepository.generate('non-user');
    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with more than two hours ', async () => {
    const user = await fakeUserRepositry.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });
    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
