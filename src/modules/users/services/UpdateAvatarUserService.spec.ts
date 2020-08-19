import FakeStoragePRovider from '@shared/container/providers/storageProvider/fakes/fakeStorageProvider';
import AppError from '@shared/erros/AppErros';
import FakeUserRepositry from '../repositories/fakes/fakeUserRepository';
import UpdateAvatarUserService from './UpdateAvatarUserService';

let fakeUserRepositry: FakeUserRepositry;
let fakeStorageProvider: FakeStoragePRovider;
let updateUSerAvatar: UpdateAvatarUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepositry = new FakeUserRepositry();
    fakeStorageProvider = new FakeStoragePRovider();

    updateUSerAvatar = new UpdateAvatarUserService(
      fakeUserRepositry,
      fakeStorageProvider,
    );
  });
  it('should be able to  update avatar', async () => {
    const user = await fakeUserRepositry.create({
      name: 'Jhon Doe',
      email: 'johndoe@email.com',
      password: '123123123',
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar without a user', async () => {
    await expect(
      updateUSerAvatar.execute({
        user_id: 'id',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar and update a new one ', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepositry.create({
      name: 'Jhon Doe',
      email: 'johndoe@email.com',
      password: '123123123',
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUSerAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
