import './index.css';

import { type PropsWithChildren } from 'react';

import { classNames } from '../../../utils/classNames';

export const Modal = ({
  isOpen,
  onClose,
  children,
  ...props
}: PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  'data-testid'?: string;
}>) => {
  return (
    <div>
      <div className={classNames('modalDimmer', isOpen ? 'visible' : 'hidden')} onClick={onClose} />

      {isOpen && (
        <div className={classNames('modalContent', isOpen ? 'visible' : 'hidden')} {...props}>
          {children}
        </div>
      )}
    </div>
  );
};
