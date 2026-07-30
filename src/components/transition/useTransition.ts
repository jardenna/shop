import { useEffect, useState } from 'react';

export type TransitionState = 'unmounted' | 'enter' | 'entered' | 'exit';

interface UseTransitionProps {
  isOpen: boolean;
  duration?: number;
}

export const useMyTransition = ({
  isOpen,
  duration = 300,
}: UseTransitionProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [transitionState, setTransitionState] = useState<TransitionState>(
    isOpen ? 'entered' : 'unmounted',
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setShouldRender(true);
      setTransitionState('enter');

      requestAnimationFrame(() => {
        setTransitionState('entered');
      });
    } else if (shouldRender) {
      setTransitionState('exit');

      timer = setTimeout(() => {
        setShouldRender(false);
        setTransitionState('unmounted');
      }, duration);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [duration, isOpen, shouldRender]);

  return {
    shouldRender,
    transitionState,
  };
};
