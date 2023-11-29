import { type PropsWithChildren, type ReactNode, useReducer } from 'react';

import { classNames } from '../../../utils/classNames';
import { useClickOutside } from '../../hooks/useClickOutside';
import styles from './index.module.css';

export const FAB = ({
  className,
  trigger,
  openedTrigger,
  children,
}: PropsWithChildren<{
  className?: string;
  trigger: ReactNode;
  openedTrigger: ReactNode;
}>) => {
  const [isOpen, toggleOpen] = useReducer((isOpen) => !isOpen, false);

  const ref = useClickOutside(toggleOpen, { enabled: isOpen });

  return (
    <div ref={ref} className={className} onClick={toggleOpen}>
      {isOpen ? openedTrigger : trigger}
      <div className={classNames(styles.contentWrapper, !isOpen && styles.close)}>{children}</div>
    </div>
  );
};
