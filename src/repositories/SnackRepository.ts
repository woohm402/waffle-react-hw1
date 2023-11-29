import { type Snack } from '../entities/snack';

export type SnackRepository = {
  listSnacks: () => Promise<Snack[]>;
  getSnack: (snackId: Snack['id']) => Promise<Snack>;
  createSnack: (snack: Pick<Snack, 'title' | 'src'>) => Promise<Snack>;
};
