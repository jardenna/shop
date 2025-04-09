import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { KeyCode } from '../types/enums';
import useClickOutside from './useClickOutside';
import useKeyPress from './useKeyPress';

const useDropdown = ({ callback }: { callback?: () => void } = {}) => {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  useKeyPress(() => {
    setDropdownIsOpen(false);
  }, [KeyCode.Esc]);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleDropdownList = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  useClickOutside(dropdownRef, () => {
    setDropdownIsOpen(false);
  }, [buttonRef]);

  useEffect(() => {
    setDropdownIsOpen(false);
  }, [location]);

  const handleCallback = () => {
    if (callback) {
      callback();
    }
    setDropdownIsOpen(false);
  };

  return { dropdownRef, dropdownIsOpen, toggleDropdownList, handleCallback };
};

export default useDropdown;
