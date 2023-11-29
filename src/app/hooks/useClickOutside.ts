import { useEffect, useRef } from 'react';

export const useClickOutside = (onClickOutside: () => void, { enabled } = { enabled: true }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current === null) return;
      if (e.target instanceof Node && contentRef.current.contains(e.target)) return;

      onClickOutside();
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClickOutside, enabled]);

  return contentRef;
};
