// import { uuid } from 'uuidv4';

// import IUserTokenRepository from '@modules/users/repositories/IUSersTokenRepository';

// import UserToken from '../../Infra/typeorm/entities/UserToken';

// class FakeUserTOkenRepository implements IUserTokenRepository {
//   private usersTokens: UserToken[] = [];

//   public async generate(user_id: string): Promise<UserToken> {
//     const userToken = new UserToken();

//     Object.assign(userToken, {
//       id: uuid(),
//       token: uuid(),
//       user_id,
//       created_at: new Date(),
//       updated_at: new Date(),
//     });

//     this.usersTokens.push(userToken);

//     return userToken;
//   }

//   public async findByToken(token: string): Promise<UserToken | undefined> {
//     const userToken = this.usersTokens.find(
//       findToken => findToken.token === token,
//     );

//     return userToken;
//   }
// }
// export default FakeUserTOkenRepository;
