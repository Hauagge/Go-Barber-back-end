import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';
import AppError from '@shared/erros/AppErros';
import User from '../Infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError(
        'Apenas Usuários Autenticados podem alterar a foto do perfil!',
        401,
      );
    }

    if (user.avatar) {
      // deletar foto  anterior
      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;
    await this.usersRepository.save(user);
    return user;
  }
}
export default UpdateAvatarUserService;
