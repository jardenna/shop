import { useEffect, useState } from 'react';

export type TransitionState = 'unmounted' | 'enter' | 'entered' | 'exit';
interface UseAnimateProps {
  isOpen: boolean;
  onEntered?: () => void;
  onExited?: () => void;
}

export const useAnimate = ({
  isOpen,
  onEntered,
  onExited,
}: UseAnimateProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [transitionState, setTransitionState] = useState<TransitionState>(
    isOpen ? 'entered' : 'unmounted',
  );

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTransitionState('enter');

      requestAnimationFrame(() => {
        setTransitionState('entered');
      });

      return;
    }

    if (shouldRender) {
      setTransitionState('exit');
    }
  }, [isOpen, shouldRender]);

  const handleTransitionEnd = () => {
    if (transitionState === 'entered') {
      onEntered?.();
      return;
    }

    if (transitionState === 'exit') {
      setShouldRender(false);
      setTransitionState('unmounted');
      onExited?.();
    }
  };

  return {
    shouldRender,
    transitionState,
    onTransitionEnd: handleTransitionEnd,
  };
};
