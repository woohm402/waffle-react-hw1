import { type SnackRepository } from '../repositories/SnackRepository';
import { type SnackService } from '../usecases/SnackService';

export const createSnackService = ({ snackRepository }: { snackRepository: SnackRepository }): SnackService => {
  return {
    listSnacks: () => snackRepository.listSnacks(),
    getSnack: (snackId) => snackRepository.getSnack(snackId),
    createSnack: (snack) => snackRepository.createSnack(snack),
  };
};
