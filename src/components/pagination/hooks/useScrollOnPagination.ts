import { useLayoutEffect, useRef, useState } from 'react';

type UseScrollOnPaginationProps = {
  isLoading: boolean;
};

export const useScrollOnPagination = <TElement extends HTMLElement>({
  isLoading,
}: UseScrollOnPaginationProps) => {
  const scrollToRef = useRef<TElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useLayoutEffect(() => {
    if (!shouldScroll || isLoading) {
      return;
    }

    scrollToRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setShouldScroll(false);
  }, [shouldScroll, isLoading]);

  return { scrollToRef, setShouldScroll };
};
