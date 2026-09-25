import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import {
  startToastExit,
  ToastTimerProps,
} from './../../../features/toastSlice';

export const useToastTimer = ({ id, type }: ToastTimerProps) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const autoHideDuration = 5000;

  useEffect(() => {
    if (type === 'error' || isHovered) {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(startToastExit(id));
    }, autoHideDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isHovered, id, type]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave };
};
