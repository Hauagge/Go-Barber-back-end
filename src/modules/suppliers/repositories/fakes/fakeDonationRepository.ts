// import IDonationRepository from '@modules/donations/repositories/IDonationRepository';
// import ICreateDonationDTO from '@modules/donations/dtos/ICreateDonationDTO';
// // import IFindAllDonationsDTO from '@modules/donations/dtos/IFindAllDonationsDTO';

// import { uuid } from 'uuidv4';
// import Donation from '../../Infra/typeorm/entities/Donation';

// class FakeDonationRepository implements IDonationRepository {
//   private donations: Donation[] = [];

//   public async findAllDonations(id: string): Promise<Donation[]> {
//     const donation = this.donations.filter(findDonation => {
//       return findDonation.id === id;
//     });

//     return donation;
//   }

//   public async create(data: ICreateDonationDTO): Promise<Donation> {
//     const donation = new Donation();

//     Object.assign(donation, { id: uuid() }, data);

//     this.donations.push(donation);
//     return donation;
//   }

//   // public async save(user: User): Promise<User> {
//   //   const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

//   //   this.users[findIndex] = user;

//   //   return user;
//   // }

//   // public async findById(id: string): Promise<Donation[]> {
//   //   const donation = this.donations.find(
//   //     findDonation => findDonation.id === id,
//   //   );

//   //   return donation;
//   // }
// }
// export default FakeDonationRepository;
