import { useLayoutEffect, useRef, useState } from 'react';

type useScrollOnPaginationProps = {
  isLoading: boolean;
};

export const useScrollOnPagination = ({
  isLoading,
}: useScrollOnPaginationProps) => {
  const scrollToRef = useRef<HTMLHeadingElement>(null);
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
