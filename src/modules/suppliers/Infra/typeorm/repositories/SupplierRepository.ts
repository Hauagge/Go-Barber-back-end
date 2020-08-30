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

  public async findAllSuppliers(): Promise<Supplier[]> {
    const suppliers = await this.supplierRepository.find();

    console.log(suppliers);

    return suppliers;
  }
}
export default SupplierRepository;
