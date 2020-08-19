import { inject, injectable } from 'tsyringe';

import IDonationRepository from '@modules/donations/repositories/IDonationRepository';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';

// import AppError from '@shared/erros/AppErros';
import Donation from '../Infra/typeorm/entities/Donation';

interface IRequest {
  id: string;
}
@injectable()
class ShowProfileService {
  constructor(
    @inject('DonationRepository')
    private donationRepository: IDonationRepository,

    @inject('CacheProvider')
    private cachProvider: ICacheProvider,
  ) {}

  public async execute({ id: user_id }: IRequest): Promise<Donation[]> {
    const cachKey = 'listDonations';
    let donations = await this.cachProvider.recover<Donation[]>(cachKey);
    if (!donations) {
      donations = await this.donationRepository.findAllDonations(user_id);

      await this.cachProvider.save(cachKey, donations);
    }

    return donations;
  }
}
export default ShowProfileService;
