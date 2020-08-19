import AppError from '@shared/erros/AppErros';
import FakeUserRepositry from '../repositories/fakes/fakeUserRepository';
import FakeHashRepository from '../providers/hashProviders/fakes/fakeHashrovider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepositry: FakeUserRepositry;
let fakeHashRepository: FakeHashRepository;
let authenticateUSer: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepositry = new FakeUserRepositry();
    fakeHashRepository = new FakeHashRepository();
    authenticateUSer = new AuthenticateUserService(
      fakeUserRepositry,
      fakeHashRepository,
    );
  });

  it('should be able to  authenticate', async () => {
    const user = await fakeUserRepositry.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1231231232',
    });

    const response = await authenticateUSer.execute({
      email: 'johndoe@email.com',
      password: '1231231232',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to  authenticate with none existing user', async () => {
    await expect(
      authenticateUSer.execute({
        email: 'johndoe@email.com',
        password: '1231231232',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to  authenticate with wrong password', async () => {
    await fakeUserRepositry.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1231231232',
    });

    await expect(
      authenticateUSer.execute({
        email: 'johndoe@email.com',
        password: '1231231876',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
