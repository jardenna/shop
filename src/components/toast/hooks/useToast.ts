import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  Toastprops,
  addToast,
  selectToastList,
} from '../../../features/toastSlice';

export const useToast = () => {
  const dispatch = useAppDispatch();
  const toastList = useAppSelector(selectToastList);

  const handleAddToast = ({ message, type }: Toastprops) => {
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
