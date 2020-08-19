import { inject, injectable } from 'tsyringe';

import path from 'path';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersTokensRepository from '@modules/users/repositories/IUSersTokenRepository';

import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';

import AppError from '@shared/erros/AppErros';
// import User from '../Infra/typeorm/entities/User';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUsersTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExist = await this.usersRepository.findByEmail(email);
    if (!checkUserExist) {
      throw new AppError('User  does not exist');
    }

    const { token } = await this.userTokenRepository.generate(
      checkUserExist.id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    await this.mailProvider.sendMail({
      to: {
        name: checkUserExist.name,
        email: checkUserExist.email,
      },
      subject: 'Recuperação de senha Equipe GoBarber',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: checkUserExist.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
