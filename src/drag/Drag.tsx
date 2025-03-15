import { FC, ReactNode, useEffect, useState } from 'react';

interface DragProps {
  children: ReactNode;
  className?: string;
  style?: any;
  onDragMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onPointerDown?: () => void;

  onPointerUp?: () => void;
}

const Drag: FC<DragProps> = ({
  onPointerDown,
  onPointerUp,

  onDragMove,
  children,
  style,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = () => {
    setIsDragging(true);

    if (onPointerDown) {
      onPointerDown();
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);

    if (onPointerUp) {
      onPointerUp();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      onDragMove(e);
    }
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp as EventListener);

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
};

export default Drag;
