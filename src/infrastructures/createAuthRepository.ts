import { type ApiClient } from '../clients/ApiClient';
import { createAccessToken } from '../entities/auth';
import { type AuthRepository } from '../repositories/AuthRepository';
import { createUserId } from './../entities/user';

type UserResponse = { id: number; username: string; created_at: string; updated_at: string };

export const createAuthRepository = ({ apiClient }: { apiClient: ApiClient }): AuthRepository => {
  return {
    getToken: async () => {
      const { data } = await apiClient.post<{ access_token: string }>('/auth/refresh');
      return { token: createAccessToken(data.access_token) };
    },
    login: async (username, password) => {
      const { data } = await apiClient.post<{ user: UserResponse; access_token: string }>('/auth/login', {
        username,
        password,
      });
      return { token: createAccessToken(data.access_token) };
    },
    getMyInfo: async () => {
      const { data } = await apiClient.get<{ user: UserResponse }>('/users/me');
      return { id: createUserId(data.user.id) };
    },
  };
};
