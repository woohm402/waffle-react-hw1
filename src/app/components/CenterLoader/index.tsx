import LoaderSvg from '../../assets/spinner.svg?react';
import styles from './index.module.css';
export const CenterLoader = () => {
  return <LoaderSvg className={styles.loader} />;
};
