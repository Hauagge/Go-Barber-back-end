import { container } from 'tsyringe';

import IHashProvider from './hashProviders/models/IHashProvider';
import BCryptHashProvider from './hashProviders/implementation/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
