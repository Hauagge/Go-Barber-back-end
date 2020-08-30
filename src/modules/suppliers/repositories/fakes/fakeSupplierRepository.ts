import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';
import ICreateSuppliersDTO from '@modules/suppliers/dtos/ICreateSuppliersDTO';
// import IFindAllDonationsDTO from '@modules/donations/dtos/IFindAllDonationsDTO';

import { uuid } from 'uuidv4';
import Supplier from '../../Infra/typeorm/entities/Supplier';

class FakeSupplierRepository implements ISupplierRepository {
  private suppliers: Supplier[] = [];

  public async findAllSuppliers(): Promise<Supplier[]> {
    const supplier = this.suppliers.map(findSupplier => findSupplier);

    return supplier;
  }

  public async create(data: ICreateSuppliersDTO): Promise<Supplier> {
    const supplier = new Supplier();

    Object.assign(supplier, { id: uuid() }, data);

    this.suppliers.push(supplier);
    return supplier;
  }

  // public async save(user: User): Promise<User> {
  //   const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

  //   this.users[findIndex] = user;

  //   return user;
  // }

  // public async findById(id: string): Promise<Donation[]> {
  //   const donation = this.donations.find(
  //     findDonation => findDonation.id === id,
  //   );

  //   return donation;
  // }
}
export default FakeSupplierRepository;
