import { type Snack } from '../../../entities/snack';
import { ProfileImage } from '../ProfileImage';
import styles from './index.module.css';

export const SnackCard = ({ snack }: { snack: Snack }) => {
  return (
    <div className={styles.card}>
      <ProfileImage src={snack.src} />
      <p>{snack.title}</p>
      <p className={styles.rating}>{snack.rating?.toPrecision(2)}</p>
    </div>
  );
};
