import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void,
  ignoreRefs: RefObject<HTMLElement | null>[] = [],
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Ignore click if it was on any of the ignored refs (like the button)
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
