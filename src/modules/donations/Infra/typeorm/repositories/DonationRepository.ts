import { getRepository, Repository } from 'typeorm';

import IDonationRepository from '@modules/donations/repositories/IDonationRepository';
import ICreateDonationDTO from '@modules/donations/dtos/ICreateDonationDTO';
// import IFindAllDonation from '@modules/donations/dtos/IFindAllDonationsDTO';
// import mercadopago from 'mercadopago';
import Donation from '../entities/Donation';

class DonationRepository implements IDonationRepository {
  private donationRepository: Repository<Donation>;

  constructor() {
    this.donationRepository = getRepository(Donation);
  }

  // public async findById(id: string): Promise<Donation | undefined> {
  //   const user = await this.ormRepository.findOne(id);
  //   return user;
  // }

  // public async findByEmail(email: string): Promise<Donation | undefined> {
  //   const user = await this.ormRepository.findOne({ where: { email } });
  //   return user;
  // }

  public async create({
    user_id,
    supplier_id,
    value,
  }: ICreateDonationDTO): Promise<Donation> {
    // mercadopago.configure({
    //   sandbox: true,
    //   access_token: process.env.ACCESS_TOKEN_TEST,
    // });

    // mercadopago.payment
    //   .create({
    //     description: 'Donation',
    //     transaction_amount: value,
    //     payment_method_id: 'rapipago',
    //     payer: {
    //       email: 'test_user_3931694@testuser.com',

    //       identification: {
    //         type: 'DNI',
    //         number: '34123123',
    //       },
    //     },
    //   })
    //   .then(function (mpResponse) {
    //     console.log(mpResponse);
    //   })
    //   .catch(function (mpError) {
    //     console.log(mpError);
    //   });

    const donation = this.donationRepository.create({
      user_id,
      supplier_id,
      value,
    });
    await this.donationRepository.save(donation);

    return donation;
  }

  // public async save(user: Donation): Promise<User> {
  //   return this.ormRepository.save(user);
  // }

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
