import { type AuthRepository } from '../repositories/AuthRepository';
import { type AuthService } from '../usecases/AuthService';

export const createAuthService = ({ authRepository }: { authRepository: AuthRepository }): AuthService => {
  return {
    getToken: () => authRepository.getToken(),
    getMyInfo: () => authRepository.getMyInfo(),
    login: (username, password) => authRepository.login(username, password),
  };
};
