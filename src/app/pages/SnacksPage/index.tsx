import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { SnackCard } from '../../components/SnackCard';
import { serviceContext } from '../../contexts/serviceContext';
import { useQuery } from '../../hooks/useQuery';
import { useTypedContext } from '../../hooks/useTypedContext';
import styles from './index.module.css';

export const SnacksPage = () => {
  const { snackService } = useTypedContext(serviceContext);
  const { data: snacks } = useQuery({ queryFn: useCallback(() => snackService.listSnacks(), [snackService]) });

  return (
    <ul className={styles.list}>
      {snacks?.map((s) => (
        <li key={s.id}>
          <Link to={`/snacks/${s.id}`}>
            <SnackCard snack={s} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
