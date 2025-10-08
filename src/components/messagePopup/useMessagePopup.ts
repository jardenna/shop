import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { MessagePopupWithoutId } from '../../features/messagePopupSlice';
import {
  addMessagePopup,
  dismissMessagePopup,
  selectDuration,
  selectMessagePopups,
} from '../../features/messagePopupSlice';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';

const useMessagePopup = (messagePopupId?: string) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const messagePopups = useAppSelector(selectMessagePopups);
  const autoHideDuration = useAppSelector(selectDuration);

  const handleAddMessagePopup = ({
    message,
    messagePopupType,
    componentType = 'toast',
    withDelay = false,
  }: MessagePopupWithoutId & { withDelay?: boolean }) => {
    if (withDelay) {
      setTimeout(() => {
        dispatch(
          addMessagePopup({
            message,
            messagePopupType,
            componentType,
          }),
        );
      }, 50);
    } else {
      dispatch(
        addMessagePopup({
          message,
          messagePopupType,
          componentType,
        }),
      );
    }
  };

  const handleDeleteMessagePopup = () => {
    setIsVisible(false);
  };

  useKeyPress(handleDeleteMessagePopup, [KeyCode.Esc]);

  useEffect(() => {
    if (!messagePopupId) {
      return;
    }

    const currentPopup = messagePopups.find(
      (messagePopup) => messagePopup.id === messagePopupId,
    );
    if (!currentPopup) {
      return;
    }

    let autoDismissTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    if (currentPopup.componentType === 'toast' && isVisible) {
      // Auto-hide toast after duration
      autoDismissTimer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDuration);
    }

    if (!isVisible) {
      removeTimer = setTimeout(() => {
        dispatch(dismissMessagePopup(messagePopupId));
      }, 500);
    }

    return () => {
      if (autoDismissTimer) {
        clearTimeout(autoDismissTimer);
      }
      if (removeTimer) {
        clearTimeout(removeTimer);
      }
    };
  }, [isVisible, autoHideDuration, dispatch, messagePopupId, messagePopups]);

  const popupClass = isVisible ? 'is-visible' : 'dismissed';

  return {
    onAddMessagePopup: handleAddMessagePopup,
    deleteMessagePopup: handleDeleteMessagePopup,
    messagePopups,
    autoHideDuration,
    popupClass,
  };
};

export default useMessagePopup;
