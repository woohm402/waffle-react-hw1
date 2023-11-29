import { ButtonHTMLAttributes } from 'react';

import { classNames } from '../../../utils/classNames';
import styles from './index.module.css';

import variantStyles from './variant.module.css';

export const Button = ({
  className,
  children,
  variant,
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary' | 'third' | 'danger';
}) => {
  return <button className={classNames(styles.button, variantStyles[variant], className)}>{children}</button>;
};
