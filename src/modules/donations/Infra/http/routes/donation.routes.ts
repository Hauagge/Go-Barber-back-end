import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/Infra/http/middlewares/ensureAuthenticated';
import DonationController from '../controllers/DonationController';

const donationsRouter = Router();
const donationController = new DonationController();

donationsRouter.post(
  '/:user_id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string(),
      provider_id: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  donationController.create,
);

donationsRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  donationController.show,
);

export default donationsRouter;
