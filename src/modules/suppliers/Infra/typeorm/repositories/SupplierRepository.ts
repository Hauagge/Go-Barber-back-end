import { getRepository, Repository } from 'typeorm';

import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';
import ICreateSuppliersDTO from '@modules/suppliers/dtos/ICreateSuppliersDTO';
// import IFindAllDonation from '@modules/donations/dtos/IFindAllDonationsDTO';

import Supplier from '../entities/Supplier';

class SupplierRepository implements ISupplierRepository {
  private supplierRepository: Repository<Supplier>;

  constructor() {
    this.supplierRepository = getRepository(Supplier);
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
    name,
    postCode,
    UF,
    city,
    line,
    phoneNumber,
  }: ICreateSuppliersDTO): Promise<Supplier> {
    const supplier = this.supplierRepository.create({
      name,
      postCode,
      UF,
      city,
      line,
      phoneNumber,
    });
    await this.supplierRepository.save(supplier);

    return supplier;
  }

  // public async save(user: Donation): Promise<User> {
  //   return this.ormRepository.save(user);
  // }

  public async findAllSuppliers(): Promise<Supplier[]> {
    const donations = await this.supplierRepository.find();

    return donations;
  }
}
export default SupplierRepository;
