import { Link } from 'react-router-dom';

import { SnackCard } from '../../components/SnackCard';
import { storeContext } from '../../contexts/storeContext';
import { useTypedContext } from '../../hooks/useTypedContext';
import styles from './index.module.css';

export const SnacksPage = () => {
  const { snacks } = useTypedContext(storeContext);

  return (
    <ul className={styles.list}>
      {snacks.map((s) => (
        <li key={s.id}>
          <Link to={`/snacks/${s.id}`}>
            <SnackCard snack={s} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
