import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const upadateAvatarUser = container.resolve(UpdateAvatarUserService);

    const user = await upadateAvatarUser.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
