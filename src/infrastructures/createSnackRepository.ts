import { type ApiClient } from '../clients/ApiClient';
import { createSnackId, createSnackRating, createSnackSrc } from '../entities/snack';
import { createSnackTitle } from '../entities/snack';
import { type SnackRepository } from '../repositories/SnackRepository';

export const createSnackRepository = ({ apiClient }: { apiClient: ApiClient }): SnackRepository => {
  return {
    createSnack: async (snack) => {
      const { data } = await apiClient.post<{
        id: number;
        name: string;
        image: string;
        rating: number;
        created_at: string;
        updated_at: string;
        author: { id: number; username: string; created_at: string; updated_at: string };
      }>('/snacks', { image: snack.src, name: snack.title });

      return {
        id: createSnackId(data.id),
        title: createSnackTitle(data.name),
        src: createSnackSrc(data.image),
        rating: createSnackRating(data.rating),
      };
    },
    getSnack: async (snackId) => {
      const { data } = await apiClient.get<{
        id: number;
        name: string;
        image: string;
        rating: number;
        created_at: string;
        updated_at: string;
        author: { id: number; username: string; created_at: string; updated_at: string };
      }>(`/snacks/${snackId}`);

      return {
        id: createSnackId(data.id),
        title: createSnackTitle(data.name),
        src: createSnackSrc(data.image),
        rating: createSnackRating(data.rating),
      };
    },
    listSnacks: async () => {
      const { data } = await apiClient.get<
        {
          id: number;
          name: string;
          image: string;
          rating: number;
          created_at: string;
          updated_at: string;
          author: { id: number; username: string; created_at: string; updated_at: string };
        }[]
      >('/snacks');

      return data.map((d) => ({
        id: createSnackId(d.id),
        title: createSnackTitle(d.name),
        src: createSnackSrc(d.image),
        rating: createSnackRating(d.rating),
      }));
    },
  };
};
