import { container } from 'tsyringe';

import IChacheProvider from './models/ICacheProvider';

import RedisCacheProvider from './implementation/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<IChacheProvider>('CacheProvider', providers.redis);
