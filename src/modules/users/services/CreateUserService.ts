import { inject, injectable } from 'tsyringe';
import 'reflect-metadata';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/erros/AppErros';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';
import User from '../Infra/typeorm/entities/User';
import IHashProvider from '../providers/hashProviders/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUSerService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cachProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email);
    if (checkUserExist) {
      throw new AppError('Este email ja está cadastrado');
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await this.cachProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUSerService;
