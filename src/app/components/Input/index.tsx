import { type InputHTMLAttributes } from 'react';

import { classNames } from '../../../utils/classNames';
import styles from './index.module.css';

export const Input = ({
  label,
  className,
  errorMessage,
  ...restProps
}: {
  label: string;
  value: string;
  onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className={classNames(styles.inputWrapper, className)}>
      <p className={styles.inputLabel}>{label}</p>
      <input className={styles.input} {...restProps} />
      <p className={styles.errorMessage}>{errorMessage}</p>
    </label>
  );
};
