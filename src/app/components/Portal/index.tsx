import { type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ root, children }: PropsWithChildren<{ root?: HTMLElement }>) => {
  const rootElement = root ?? document.getElementById('root');

  if (!rootElement) throw new Error();

  return <>{createPortal(children, rootElement)}</>;
};
