import { getRepository, Repository } from 'typeorm';

import IDonationRepository from '@modules/donations/repositories/IDonationRepository';
import ICreateDonationDTO from '@modules/donations/dtos/ICreateDonationDTO';
// import IFindAllDonation from '@modules/donations/dtos/IFindAllDonationsDTO';
import Donation from '../entities/Donation';

class DonationRepository implements IDonationRepository {
  private donationRepository: Repository<Donation>;

  constructor() {
    this.donationRepository = getRepository(Donation);
  }

  public async create({
    user_id,
    supplier_id,
    value,
  }: ICreateDonationDTO): Promise<Donation> {
    const donation = this.donationRepository.create({
      user_id,
      supplier_id,
      value,
    });
    await this.donationRepository.save(donation);

    return donation;
  }

  public async findAllDonations(user_id?: string): Promise<Donation[]> {
    let donations: Donation[];
    if (user_id) {
      donations = await this.donationRepository.find({
        where: {
          id: { user_id },
        },
      });
    } else {
      donations = await this.donationRepository.find();
    }
    return donations;
  }
}
export default DonationRepository;

// public async findById(id: string): Promise<Donation | undefined> {
//   const user = await this.ormRepository.findOne(id);
//   return user;
// }

// public async findByEmail(email: string): Promise<Donation | undefined> {
//   const user = await this.ormRepository.findOne({ where: { email } });
//   return user;
// }
// public async save(user: Donation): Promise<User> {
//   return this.ormRepository.save(user);
// }
