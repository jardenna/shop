import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  Toastprops,
  addToast,
  selectToastList,
} from '../../../features/toastSlice';

export const useToastNew = ({ message, type }: Toastprops) => {
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
