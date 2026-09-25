import { useAppDispatch } from '../../app/hooks';
import { dismissToast, startToastExit } from '../../features/toastSlice';
import BtnClose from '../BtnClose';
import Icon from '../icons/Icon';
import { useAnimate } from '../Modal/useAnimate';
import { ToastTimerProps, useToastTimer } from './hooks/useToastTimer';
import { toastTypeConfig } from './toastConfig';

export interface ToastItemProps extends ToastTimerProps {
  isExiting: boolean;
  message: string;
  count?: number;
}

const ToastItem = ({ id, type, count, message, isExiting }: ToastItemProps) => {
  const dispatch = useAppDispatch();
  const { iconName, role } = toastTypeConfig[type];

  const { onMouseEnter, onMouseLeave } = useToastTimer({
    id,
    type,
  });

  const handleDeleteToast = () => {
    dispatch(startToastExit(id));
  };

  const { shouldRender, transitionState, onTransitionEnd } = useAnimate({
    isOpen: !isExiting,
    onExited: () => dispatch(dismissToast(id)),
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <li
      role={role}
      className={`toast-item ${type} transition ${transitionState} from-bottom-center`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget) {
          onTransitionEnd();
        }
      }}
    >
      <div className="toast-content">
        <Icon iconName={iconName} />
        <p className="toast-message">
          {message} {count && count > 1 && count}
        </p>
      </div>

      <BtnClose onClick={handleDeleteToast} size="1em" />
    </li>
  );
};

export default ToastItem;
