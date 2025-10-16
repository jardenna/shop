import { useEffect, useRef, useState } from 'react';

const useAnnouncement = (deps: any[]) => {
  const hasMounted = useRef(false);
  const [announce, setAnnounce] = useState(false);

  useEffect(() => {
    if (hasMounted.current) {
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

  return announce;
};

export default useAnnouncement;
