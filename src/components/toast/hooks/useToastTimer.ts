import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import {
  startToastExit,
  ToastTimerProps,
} from './../../../features/toastSlice';

export const useToastTimer = ({ id, type }: ToastTimerProps) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const remainingTime = useRef(5000);

  useEffect(() => {
    if (type === 'error' || isHovered) {
      return;
    }

    const startTime = Date.now();

    const timer = setTimeout(() => {
      dispatch(startToastExit(id));
    }, remainingTime.current);

    return () => {
      clearTimeout(timer);

      const elapsedTime = Date.now() - startTime;
      // On hover count seconds before closing
      remainingTime.current = Math.max(0, remainingTime.current - elapsedTime);
    };
  }, [dispatch, isHovered, id, type]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};
