  import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/erros/AppErros';
import IHashProvider from '../providers/hashProviders/models/IHashProvider';
import User from '../Infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError(
        'Apenas Usuários Autenticados podem alterar a foto do perfil!',
        401,
      );
    }

    const findEmail = await this.usersRepository.findByEmail(email);

    if (findEmail && findEmail.id !== user_id) {
      throw new AppError('O e-mail digitado ja está sendo utilizado!');
    }
    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('A senha antiga deve ser digitada');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!checkOldPassword) {
        throw new AppError('A senha antiga digitada está incorreta');
      }
      user.password = password;
    }

    await this.usersRepository.save(user);
    return user;
  }
}
export default UpdateProfileService;
