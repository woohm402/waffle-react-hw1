import { useEffect, useState } from 'react';

export const useQuery = <T = unknown>({ queryFn }: { queryFn: () => Promise<T> }) => {
  const [data, setData] = useState<T>();
  const [, setStatus] = useState<'fetching' | 'error' | 'success' | 'idle'>('idle');

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setStatus('fetching');
        const data = await queryFn();
        if (!cancelled) setData(data);
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [queryFn]);

  return { data };
};
