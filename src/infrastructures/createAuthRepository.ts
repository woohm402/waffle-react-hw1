import { type ApiClient } from '../clients/ApiClient';
import { type AuthRepository } from '../repositories/AuthRepository';

export const createAuthRepository = ({ apiClient }: { apiClient: ApiClient }): AuthRepository => {
  return {
    getToken: async () => {
      const { data } = await apiClient.post<{ access_token: string }>('/auth/refresh');
      return { token: data.access_token };
    },
    login: async (username, password) => {
      const { data } = await apiClient.post<{
        user: { id: number; username: string; created_at: string; updated_at: string };
        access_token: string;
      }>('/auth/login', { username, password });
      return { token: data.access_token };
    },
  };
};
