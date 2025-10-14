import { useEffect } from 'react';
import type { RefElementType } from '../types/types';

const useClickOutside = (
  ref: RefElementType,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void,
  ignoreRefs: RefElementType[] = [],
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Ignore click if it was on ignored refs (like the button)
      if (
        ignoreRefs.some((ignoreRef) =>
          ignoreRef.current?.contains(event.target as Node),
        )
      ) {
        return;
      }

      handleOnClickOutside(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handleOnClickOutside, ignoreRefs]);
};

export default useClickOutside;
