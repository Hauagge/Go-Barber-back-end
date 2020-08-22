// import AppError from '@shared/erros/AppErros';
// import FakeCacheProvider from '@shared/container/providers/cacheProvider/fakes/fakeCacheProvider';
// import FakeHashRepository from '@modules/users/providers/hashProviders/fakes/fakeHashrovider';
// import FakeUserRepositry from '@modules/users/repositories/fakes/fakeUserRepository';
// import FakeDonationRepository from '../repositories/fakes/fakeDonationRepository';

// import CreateDonationService from './CreateDonationService';

// let fakeUserRepositry: FakeUserRepositry;
// let fakeCacheProvider: FakeCacheProvider;

// let fakeDonation: FakeDonationRepository;

// let createDonation: CreateDonationService;
// describe('CreateUser', () => {
//   beforeEach(() => {
//     fakeUserRepositry = new FakeUserRepositry();
//     fakeCacheProvider = new FakeCacheProvider();

//     createDonation = new CreateDonationService(fakeDonation, fakeCacheProvider);
//   });
//   it('should be able to  cerate a donation', async () => {
//     const user = await createDonation.execute({
//       user_id: 'id_usuario',
//       value: 300,
//       provider_id: '123123123',
//     });

//     expect(user).toHaveProperty('id');
//   });

// it('should not be able to  cerate a new user with same email from another', async () => {
//   await createUSer.execute({
//     name: 'John Doe',
//     email: 'johndoe@email.com',
//     password: '123123',
//   });

//   await expect(
//     createUSer.execute({
//       name: 'John Doe',
//       email: 'johndoe@email.com',
//       password: '123123',
//     }),
//   ).rejects.toBeInstanceOf(AppError);
// });
// });
