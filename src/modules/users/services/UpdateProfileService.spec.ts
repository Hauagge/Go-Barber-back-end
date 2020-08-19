import AppError from '@shared/erros/AppErros';
import FakeHashProvider from '../providers/hashProviders/fakes/fakeHashrovider';
// import AppError from '@shared/erros/AppErros';
import FakeUserRepositry from '../repositories/fakes/fakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepositry: FakeUserRepositry;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepositry = new FakeUserRepositry();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepositry,
      fakeHashProvider,
    );
  });
  it('should be able to  update the profile', async () => {
    const user = await fakeUserRepositry.create({
      name: 'Jhon Doe',
      email: 'johndoe@email.com',
      password: '123123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@email.com',
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('johntre@email.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existin-id',
        name: 'non-user-exist',
        email: 'non@existing.email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another  existing user email', async () => {
    await fakeUserRepositry.create({
      name: 'Jhon Doe',
      email: 'johndoe@email.com',
      password: '123123123',
    });

    const user = await fakeUserRepositry.create({
      name: 'Jhon Tre',
      email: 'johntre@email.com',
      password: '123123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to  update the password', async () => {
    const user = await fakeUserRepositry.create({
      name: 'Jhon Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@email.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to  update the password without old password', async () => {
    const user = await fakeUserRepositry.create({
      name: 'Jhon Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to  update the password with wrong old password', async () => {
    const user = await fakeUserRepositry.create({
      name: 'Jhon Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@email.com',
        old_password: '12345',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
