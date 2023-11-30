import { useEffect, useState } from 'react';

export const useQuery = <T = unknown>({
  queryFn,
  enabled = true,
}: {
  queryFn: () => Promise<T>;
  enabled?: boolean;
}): ({ data: T; status: 'success' } | { data: undefined; status: 'pending' }) & { refetch: () => void } => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const fetchData = async () => {
      try {
        const data = await queryFn();
        if (!cancelled) setData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [queryFn, enabled]);

  const refetch = async () => {
    try {
      const data = await queryFn();
      setData(data);
    } catch (err) {
      setError(err);
    }
  };

  if (error) throw error;

  if (!data) return { data: undefined, status: 'pending', refetch };

  return { data, status: 'success', refetch };
};
