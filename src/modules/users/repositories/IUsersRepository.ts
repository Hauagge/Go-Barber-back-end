import User from '../Infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUsersDTO';
import IFindAllProvider from '../dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
  findAllProviders(excep_user_id?: IFindAllProvider): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
