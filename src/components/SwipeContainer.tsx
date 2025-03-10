import { FC, ReactNode, TouchEvent, useState } from 'react';

interface SwipeContainerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const SwipeContainer: FC<SwipeContainerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.targetTouches[0];
    setTouchStart({ x: clientX, y: clientY });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.targetTouches[0];
    setTouchEnd({ x: clientX, y: clientY });
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) {
      return;
    }

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    // Check if the swipe is more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50 && onSwipeLeft) {
        onSwipeLeft();
      } else if (deltaX < -50 && onSwipeRight) {
        onSwipeRight();
      }
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="swipe-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default SwipeContainer;
