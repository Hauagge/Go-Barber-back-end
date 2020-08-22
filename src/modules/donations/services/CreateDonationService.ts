import { inject, injectable } from 'tsyringe';
import 'reflect-metadata';
import IDonationRepository from '@modules/donations/repositories/IDonationRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/erros/AppErros';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';
import Donation from '../Infra/typeorm/entities/Donation';

interface IRequest {
  user_id: string;
  supplier_id: string;
  value: number;
}
@injectable()
class CreateDonationService {
  constructor(
    @inject('DonationRepository')
    private donationRepository: IDonationRepository,

    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('CacheProvider')
    private cachProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    supplier_id,
    value,
  }: IRequest): Promise<Donation> {
    const checkUserExist = await this.userRepository.findById(user_id);
    if (!checkUserExist) {
      throw new AppError('this user do not exist');
    }

    const donation = await this.donationRepository.create({
      user_id,
      supplier_id,
      value,
    });

    await this.cachProvider.invalidatePrefix('providers-list');

    return donation;
  }
}

export default CreateDonationService;
