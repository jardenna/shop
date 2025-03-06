/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  MessagePopupWithoutId,
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
  }: MessagePopupWithoutId) => {
    dispatch(
      addMessagePopup({
        message,
        messagePopupType,
        componentType,
      }),
    );
  };

  const handleDeleteMessagePopup = () => {
    setIsVisible(false);
  };
  useKeyPress(handleDeleteMessagePopup, [KeyCode.Esc]);

  useEffect(() => {
    if (messagePopups[0]?.componentType !== 'toast') {
      return;
    }

    if (isVisible) {
      // Start the auto-dismiss timer
      const timer = setTimeout(() => setIsVisible(false), autoHideDuration);
      return () => clearTimeout(timer);
    }
    // Start the removal timer after the dismissal animation completes
    const timer = setTimeout(
      () => dispatch(dismissMessagePopup(messagePopupId || '')),
      500,
    );
    return () => clearTimeout(timer);
  }, [isVisible, autoHideDuration, dispatch, messagePopupId]);

  const popupClass = isVisible ? 'is-visible' : 'dismissed';

  return {
    addMessagePopup: handleAddMessagePopup,
    deleteMessagePopup: handleDeleteMessagePopup,
    messagePopups,
    autoHideDuration,
    popupClass,
  };
};

export default useMessagePopup;
