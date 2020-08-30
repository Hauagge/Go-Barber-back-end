// import AppError from '@shared/erros/AppErros';
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fakes/fakeCacheProvider';
import FakeSupplierRepository from '../repositories/fakes/fakeSupplierRepository';
import ListAllSupplier from './ListAllSupplierService';

let fakeSupplierRepository: FakeSupplierRepository;
let listAllSuppliersService: ListAllSupplier;
let fakeCacheProvider: FakeCacheProvider;

describe('Show Profile', () => {
  beforeEach(() => {
    fakeSupplierRepository = new FakeSupplierRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listAllSuppliersService = new ListAllSupplier(
      fakeSupplierRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list all suppliers', async () => {
    const supplier = await fakeSupplierRepository.create({
      name: 'Mercadao da maria',
      postCode: '87303250',
      UF: 'PR',
      city: 'Campo Morao',
      line: 'Rua das margaridas',
      phoneNumber: '99999999',
    });

    const supplier1 = await fakeSupplierRepository.create({
      name: 'Mercadao do Jaum',
      postCode: '87300000',
      UF: 'PR',
      city: 'Washington',
      line: 'Rua do Brasil',
      phoneNumber: '5599999999',
    });

    const listSuppliers = await listAllSuppliersService.execute();

    expect(listSuppliers).toBe([supplier, supplier1]);
  });
});
