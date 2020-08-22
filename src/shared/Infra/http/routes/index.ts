import { Router } from 'express';
import DonationsRouter from '@modules/donations/Infra/http/routes/donation.routes';
import userRouter from '@modules/users/Infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/Infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/Infra/http/routes/password.routes';
import SupplierRouter from '@modules/suppliers/Infra/http/routes/supplier.routes';

// import profileRouter from '@modules/users/Infra/http/routes/profile.routes';
// import providerRouter from '@modules/appointments/Infra/http/routes/provider.routes';

const routes = Router();

routes.use('/directdonation', DonationsRouter);
routes.use('/singup', userRouter);
routes.use('/singin', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/suppliers', SupplierRouter);

// routes.use('/profile', profileRouter);
// routes.use('/listproviders', providerRouter);

export default routes;
