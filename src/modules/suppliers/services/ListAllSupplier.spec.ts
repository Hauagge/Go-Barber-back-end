// import AppError from '@shared/erros/AppErros';
// import FakeUserRepositry from '../repositories/fakes/fakeUserRepository';
// import ShowProfileService from './ShowProfileService';

// let fakeUserRepositry: FakeUserRepositry;
// let showProfileService: ShowProfileService;
// describe('Show Profile', () => {
//   beforeEach(() => {
//     fakeUserRepositry = new FakeUserRepositry();

//     showProfileService = new ShowProfileService(fakeUserRepositry);
//   });
//   it('should be able to show the profile', async () => {
//     const user = await fakeUserRepositry.create({
//       name: 'Jhon Doe',
//       email: 'johndoe@email.com',
//       password: '123123123',
//     });

//     const profile = await showProfileService.execute({
//       user_id: user.id,
//     });

//     expect(profile.name).toBe('Jhon Doe');
//     expect(profile.email).toBe('johndoe@email.com');
//   });

//   it('should not be able to show the profile from non-existing user', async () => {
//     await expect(
//       showProfileService.execute({
//         user_id: 'non-existin-id',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
