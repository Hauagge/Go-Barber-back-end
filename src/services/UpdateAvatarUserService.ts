import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upaload';
import AppError from '../erros/AppErros';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateAvatarUserService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new AppError(
        'Apenas Usuários Autenticados podem alterar a foto do perfil!',
        401,
      );
    }

    if (user.avatar) {
      // deletar foto  anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}
export default UpdateAvatarUserService;
