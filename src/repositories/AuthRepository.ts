import { type AccessToken } from '../entities/auth';
import { type User } from '../entities/user';

export type AuthRepository = {
  getToken: () => Promise<{ token: AccessToken }>;
  getMyInfo: () => Promise<User>;
  login: (username: string, password: string) => Promise<{ token: AccessToken }>;
};
