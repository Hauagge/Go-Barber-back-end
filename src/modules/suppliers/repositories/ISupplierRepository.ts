import Supplier from '../Infra/typeorm/entities/Supplier';
import ICreateSuppliersDTO from '../dtos/ICreateSuppliersDTO';
// import IListAllSupliersDTO from '../dtos/IListAllSupliersDTO';

export default interface ISupplierRepository {
  findAllSuppliers(): Promise<Supplier[]>;
  create(data: ICreateSuppliersDTO): Promise<Supplier>;
}
// findById(id: string): Promise<Donation | undefined>;
// findByEmail(email: string): Promise<User | undefined>;
// save(user: User): Promise<User>;
