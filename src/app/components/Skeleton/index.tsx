import { type HTMLAttributes } from 'react';

import { classNames } from '../../../utils/classNames';
import styles from './index.module.css';

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={classNames(className, styles.skeleton)} {...props} />;
};
