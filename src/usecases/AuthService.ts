import { type AccessToken } from '../entities/auth';
import { type User } from '../entities/user';

export type AuthService = {
  getToken: () => Promise<{ token: AccessToken }>;
  getMyInfo: () => Promise<User>;
  login: (username: string, password: string) => Promise<{ token: AccessToken }>;
};
