import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToast,
  selectToastList,
  Toastprops,
} from '../../features/toastSlice';

export const useToast = ({ message, type }: Toastprops) => {
  const dispatch = useAppDispatch();
  const toastList = useAppSelector(selectToastList);

  const handleAddToast = () => {
    dispatch(
      addToast({
        message,
        type,
      }),
    );
  };

  return {
    toastList,
    onAddToast: handleAddToast,
  };
};
