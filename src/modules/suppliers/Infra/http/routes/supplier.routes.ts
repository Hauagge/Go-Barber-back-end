import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/Infra/http/middlewares/ensureAuthenticated';
import SupplierController from '../controllers/SupplierController';

const SupplierRouter = Router();
const supplierController = new SupplierController();

SupplierRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      postCode: Joi.string().required(),
      UF: Joi.string().required(),
      city: Joi.string().required(),
      line: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    },
  }),
  supplierController.create,
);

SupplierRouter.get('/', ensureAuthenticated, supplierController.show);

export default SupplierRouter;
