import { type ImgHTMLAttributes } from 'react';

import { classNames } from '../../../utils/classNames';
import styles from './index.module.css';

export const ProfileImage = ({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
  <img className={classNames(className, styles.image)} {...props} />
);
