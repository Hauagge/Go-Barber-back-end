import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../erros/AppErros';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUSerService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new AppError('Este email ja está cadastrado');
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });
    await userRepository.save(user);

    return user;
  }
}

export default CreateUSerService;
