import {
  FC,
  MouseEvent,
  PointerEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface DragProps {
  children: ReactNode;
  className?: string;
  onDragMove: (event: MouseEvent<HTMLDivElement>) => void;
}

const Drag: FC<DragProps> = ({ onDragMove, children, className }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      onDragMove(event);
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
      className={className}
    >
      {children}
    </div>
  );
};

export default Drag;
