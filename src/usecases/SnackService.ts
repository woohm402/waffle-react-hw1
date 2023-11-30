import { type Snack } from '../entities/snack';

export type SnackService = {
  listSnacks: () => Promise<Snack[]>;
  getSnack: (snackId: Snack['id']) => Promise<Snack>;
  createSnack: (snack: Pick<Snack, 'src' | 'title'>) => Promise<Snack>;
  validateSnack: (
    snackForm: Partial<{ src: string; title: string }>,
  ) =>
    | { valid: false; errors: Partial<{ src: string; title: string }> }
    | { valid: true; snack: Pick<Snack, 'src' | 'title'> };
};
