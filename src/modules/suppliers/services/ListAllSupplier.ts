import { inject, injectable } from 'tsyringe';

import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';

// import AppError from '@shared/erros/AppErros';
import Supplier from '../Infra/typeorm/entities/Supplier';

@injectable()
class ListAllSuppliersService {
  constructor(
    @inject('SupplierRepository')
    private supplierRepository: ISupplierRepository,

    @inject('CacheProvider')
    private cachProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Supplier[]> {
    const cachKey = 'listSupplier';
    let supplier = await this.cachProvider.recover<Supplier[]>(cachKey);
    if (!supplier) {
      supplier = await this.supplierRepository.findAllSuppliers();

      await this.cachProvider.save(cachKey, supplier);
    }

    return supplier;
  }
}
export default ListAllSuppliersService;
