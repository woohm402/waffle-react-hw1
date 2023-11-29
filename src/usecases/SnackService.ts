import { type Snack } from '../entities/snack';

export type SnackService = {
  listSnacks: () => Promise<Snack[]>;
  getSnack: (snackId: Snack['id']) => Promise<Snack>;
  createSnack: (snack: Pick<Snack, 'src' | 'title'>) => Promise<Snack>;
};
