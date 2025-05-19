import { createPopper, Instance, Placement } from '@popperjs/core';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { KeyCode } from '../types/enums';
import useClickOutside from './useClickOutside';
import useKeyPress from './useKeyPress';

type useDropdownProps = {
  placement?: Placement;
  callback?: () => void;
};

const useDropdown = ({ callback, placement }: useDropdownProps) => {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const popperInstanceRef = useRef<Instance | null>(null);

  useKeyPress(() => {
    setDropdownIsOpen(false);
  }, [KeyCode.Esc]);

  useClickOutside(dropdownRef, () => {
    setDropdownIsOpen(false);
  }, [buttonRef]);

  useEffect(() => {
    setDropdownIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (dropdownIsOpen && buttonRef.current && dropdownRef.current) {
      popperInstanceRef.current = createPopper(
        buttonRef.current,
        dropdownRef.current,
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
  }, [dropdownIsOpen]);

  const toggleDropdownList = () => {
    setDropdownIsOpen((prev) => !prev);
  };

  const handleCallback = () => {
    callback?.();
    setDropdownIsOpen(false);
  };

  return {
    dropdownRef,
    buttonRef,
    dropdownIsOpen,
    toggleDropdownList,
    handleCallback,
    arrowRef,
  };
};

export default useDropdown;
