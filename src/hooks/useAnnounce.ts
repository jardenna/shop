import { DependencyList, useEffect, useRef, useState } from 'react';

export const useAnnounce = (deps: DependencyList) => {
  const hasMounted = useRef(false);
  const [announce, setAnnounce] = useState(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setAnnounce(true);

    const timer = window.setTimeout(() => {
      setAnnounce(false);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, deps);

  return announce;
};
