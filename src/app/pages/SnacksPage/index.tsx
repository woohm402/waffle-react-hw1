import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Skeleton } from '../../components/Skeleton';
import { SnackCard } from '../../components/SnackCard';
import { serviceContext } from '../../contexts/serviceContext';
import { useQuery } from '../../hooks/useQuery';
import { useTypedContext } from '../../hooks/useTypedContext';
import styles from './index.module.css';

export const SnacksPage = () => {
  const { snackService } = useTypedContext(serviceContext);
  const { data: snacks, status } = useQuery({ queryFn: useCallback(() => snackService.listSnacks(), [snackService]) });

  return (
    <ul className={styles.list}>
      {status === 'pending' ? (
        <>
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
          <Skeleton className={styles.skeleton} />
        </>
      ) : (
        snacks.map((s) => (
          <li key={s.id}>
            <Link to={`/snacks/${s.id}`}>
              <SnackCard snack={s} />
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};
