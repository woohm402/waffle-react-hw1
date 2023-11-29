import { type Snack } from '../entities/snack';

export type SnackService = {
  listSnacks: () => Promise<Snack[]>;
  getSnack: (snackId: Snack['id']) => Promise<Snack>;
  createSnack: (snack: Omit<Snack, 'id'>) => Promise<Snack>;
};
