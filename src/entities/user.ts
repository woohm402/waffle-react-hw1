import { type Brand, brand } from '../utils/brand';

export type User = {
  id: Brand<number, 'UserId'>;
};

export const createUserId = (id: number): User['id'] => brand(id, 'UserId');
