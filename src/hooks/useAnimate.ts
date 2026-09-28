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
  // Initialize the render state and transition state based on whether the element is open.
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [transitionState, setTransitionState] = useState<TransitionState>(
    isOpen ? 'enter' : 'unmounted',
  );

  useEffect(() => {
    if (isOpen) {
      // Ensure the element is mounted before starting the enter transition.
      setShouldRender(true);
      setTransitionState('enter');

      let secondFrame = 0;

      // Defer the transition to the next animation frame so the browser can apply the initial state.
      const firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          setTransitionState('entered');
        });
      });

      return () => {
        cancelAnimationFrame(firstFrame);
        cancelAnimationFrame(secondFrame);
      };
    }

    if (shouldRender) {
      setTransitionState('exit');
    }
  }, [isOpen, shouldRender]);

  const handleTransitionEnd = () => {
    if (transitionState === 'entered') {
      // Call the callback when the enter transition has completed.
      onEntered?.();
      return;
    }

    if (transitionState === 'exit') {
      // Unmount the element after the exit transition has completed.
      setShouldRender(false);
      setTransitionState('unmounted');

      // Run callback when exit transition has finished
      onExited?.();
    }
  };

  return {
    shouldRender,
    transitionState,
    onTransitionEnd: handleTransitionEnd,
  };
};
