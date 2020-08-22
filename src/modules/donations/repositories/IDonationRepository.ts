import Donation from '../Infra/typeorm/entities/Donation';
import ICreateDonationDTO from '../dtos/ICreateDonationDTO';
// import IFindAllDonationsDTO from '../dtos/IFindAllDonationsDTO';

export default interface IDonationRepository {
  findAllDonations(id: string): Promise<Donation[]>;
  // findById(id: string): Promise<Donation | undefined>;
  // findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateDonationDTO): Promise<Donation>;
  // save(user: User): Promise<User>;
}
