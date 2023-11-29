import { useCallback } from 'react';

export const useMutation = <T = unknown, S = undefined>({ mutationFn }: { mutationFn: (data: S) => Promise<T> }) => {
  const mutate = useCallback(
    async (req: S, { onSuccess }: { onSuccess?: (data: T) => void }) => {
      try {
        const data = await mutationFn(req);
        onSuccess?.(data);
      } catch (err) {
        //
      }
    },
    [mutationFn],
  );

  return { mutate };
};
