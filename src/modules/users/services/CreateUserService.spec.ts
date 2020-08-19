import AppError from '@shared/erros/AppErros';
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fakes/fakeCacheProvider';
import FakeHashRepository from '../providers/hashProviders/fakes/fakeHashrovider';

import FakeUserRepositry from '../repositories/fakes/fakeUserRepository';
import CreateUserService from './CreateUserService';

let fakeUserRepositry: FakeUserRepositry;
let fakeCacheProvider: FakeCacheProvider;

let fakeHashRepository: FakeHashRepository;
let createUSer: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepositry = new FakeUserRepositry();
    fakeCacheProvider = new FakeCacheProvider();

    fakeHashRepository = new FakeHashRepository();

    createUSer = new CreateUserService(
      fakeUserRepositry,
      fakeHashRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to  cerate a new user', async () => {
    const user = await createUSer.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to  cerate a new user with same email from another', async () => {
    await createUSer.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    await expect(
      createUSer.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
