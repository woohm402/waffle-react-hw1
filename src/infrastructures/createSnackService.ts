import { createSnackSrc, type Snack } from '../entities/snack';
import { type SnackRepository } from '../repositories/SnackRepository';
import { type SnackService } from '../usecases/SnackService';
import { createSnackTitle } from './../entities/snack';

export const createSnackService = ({ snackRepository }: { snackRepository: SnackRepository }): SnackService => {
  return {
    listSnacks: () => snackRepository.listSnacks(),
    getSnack: (snackId) => snackRepository.getSnack(snackId),
    createSnack: (snack) => snackRepository.createSnack(snack),
    validateSnack: (snackForm) => {
      type Invalid = { message: string; valid: false };

      const srcResult = ((): { valid: true; src: Snack['src'] } | Invalid => {
        try {
          if (!snackForm.src) throw new Error();
          const src = createSnackSrc(snackForm.src);
          return { valid: true, src };
        } catch (err) {
          const message = '1자 이상이어야 합니다.'; // cannot reach here
          return { valid: false, message };
        }
      })();

      const titleResult = ((): { valid: true; title: Snack['title'] } | Invalid => {
        try {
          if (!snackForm.title) throw new Error();
          return { valid: true, title: createSnackTitle(snackForm.title) } as const;
        } catch (err) {
          const message = '첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요';
          return { valid: false, message } as const;
        }
      })();

      if (titleResult.valid && srcResult.valid)
        return { valid: true, snack: { title: titleResult.title, src: srcResult.src } };

      return {
        valid: false,
        errors: {
          ...(titleResult.valid ? {} : { title: titleResult.message }),
          ...(srcResult.valid ? {} : { src: srcResult.message }),
        },
      };
    },
  };
};
