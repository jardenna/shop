import { useLayoutEffect, useRef, useState } from 'react';

type useScrollOnPaginationProps = {
  isLoading: boolean;
};

const useScrollOnPagination = ({ isLoading }: useScrollOnPaginationProps) => {
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

export default useScrollOnPagination;
