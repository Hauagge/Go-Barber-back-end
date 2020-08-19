import { container } from 'tsyringe';
import uploadConfig from '@config/upaload';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementation/diskStorageProvider';
import S3StorageProvider from './implementation/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
