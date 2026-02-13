import { PASSWORD_HASHER_PORT } from '@/modules/user/application';
import { BcryptPasswordHasherImpl } from '../infrastructure';

export const passwordHasherProvider = [
  {
    provide: PASSWORD_HASHER_PORT,
    useClass: BcryptPasswordHasherImpl,
  },
];
