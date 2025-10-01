import { createPopper, Instance, Placement } from '@popperjs/core';
import { useEffect, useRef, useState } from 'react';
import { KeyCode } from '../types/enums';
import useClickOutside from './useClickOutside';
import useKeyPress from './useKeyPress';

type usePopupProps = {
  placement?: Placement;
  callback?: () => void;
};

const usePopup = ({ callback, placement }: usePopupProps) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const popperInstanceRef = useRef<Instance | null>(null);

  useKeyPress(() => {
    setPopupIsOpen(false);
  }, [KeyCode.Esc]);

  useClickOutside(popupRef, () => {
    setPopupIsOpen(false);
  }, [buttonRef]);

  useEffect(() => {
    if (popupIsOpen && buttonRef.current && popupRef.current) {
      popperInstanceRef.current = createPopper(
        buttonRef.current,
        popupRef.current,
        {
          placement: placement || 'top-start',
          // "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";
          modifiers: [
            {
              name: 'offset',
              options: { offset: [0, 8] },
            },
            {
              name: 'preventOverflow',
              options: { boundary: 'viewport' },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'bottom', 'left', 'right'],
              },
            },
            {
              name: 'arrow',
              options: {
                element: arrowRef.current,
                padding: 6,
              },
            },
          ],
        },
      );
    }

    return () => {
      popperInstanceRef.current?.destroy();
      popperInstanceRef.current = null;
    };
  }, [popupIsOpen]);

  const togglePopupList = () => {
    setPopupIsOpen(!popupIsOpen);
  };

  const handleCallback = () => {
    callback?.();
    setPopupIsOpen(false);
  };

  return {
    popupRef,
    buttonRef,
    popupIsOpen,
    togglePopupList,
    onCallback: handleCallback,
    arrowRef,
  };
};

export default usePopup;
