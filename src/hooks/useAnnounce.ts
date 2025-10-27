import { useEffect, useRef, useState } from 'react';

const useAnnounce = (deps: unknown[]) => {
  const hasMounted = useRef(false);
  const [announce, setAnnounce] = useState(false);

  useEffect(() => {
    if (hasMounted.current) {
      // Page actually changed after first render
      setAnnounce(true);
      const timer = setTimeout(() => {
        setAnnounce(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    hasMounted.current = true;
  }, deps);

  return { announce };
};

export default useAnnounce;
