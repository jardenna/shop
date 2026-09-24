import { useEffect, useState } from 'react';

export type TransitionState = 'unmounted' | 'enter' | 'entered' | 'exit';

interface UseAnimatedMountProps {
  isOpen: boolean;
  duration?: number;
  onEntered?: () => void;
  onExited?: () => void;
}

export const useAnimatedMount = ({
  isOpen,
  duration = 300,
}: UseAnimatedMountProps) => {
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
    } else {
      setTransitionState('exit');

      timer = setTimeout(() => {
        setShouldRender(false);
        setTransitionState('unmounted');
      }, duration);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [duration, isOpen]);

  return {
    shouldRender,
    transitionState,
  };
};
