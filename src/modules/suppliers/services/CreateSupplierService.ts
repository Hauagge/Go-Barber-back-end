import { inject, injectable } from 'tsyringe';
import 'reflect-metadata';
import ISupplierRepository from '@modules/suppliers/repositories/ISupplierRepository';

// import AppError from '@shared/erros/AppErros';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';
import Supplier from '../Infra/typeorm/entities/Supplier';

interface IRequest {
  name: string;
  postCode: string;
  UF: string;
  city: string;
  line: string;
  phoneNumber: string;
}
@injectable()
class CreateDonationService {
  constructor(
    @inject('SupplierRepository')
    private supplierRepository: ISupplierRepository,

    @inject('CacheProvider')
    private cachProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    postCode,
    UF,
    city,
    line,
    phoneNumber,
  }: IRequest): Promise<Supplier> {
    // const checkUserExist = await this.supplierRepository.findById(name);
    // if (!checkUserExist) {
    //   throw new AppError('this user do not exist');
    // }

    const suppllier = await this.supplierRepository.create({
      name,
      postCode,
      UF,
      city,
      line,
      phoneNumber,
    });

    await this.cachProvider.invalidatePrefix('listSupplier');

    return suppllier;
  }
}

export default CreateDonationService;
