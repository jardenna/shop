import { useEffect, useRef } from 'react';
import { KeyCode } from '../types/enums';

function useKeyPress(callback: () => void, keyCombination: KeyCode[]): void {
  const pressedKeysRef = useRef<Set<KeyCode>>(new Set());

  const downHandler = (event: KeyboardEvent) => {
    if (keyCombination.includes(event.code as KeyCode)) {
      event.preventDefault();
      pressedKeysRef.current.add(event.code as KeyCode);

      // Check if all keys in the combination are pressed
      if (keyCombination.every((key) => pressedKeysRef.current.has(key))) {
        callback();
      }
    }
  };

  const upHandler = (event: KeyboardEvent) => {
    pressedKeysRef.current.delete(event.code as KeyCode);
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keyCombination, callback]);
}

export default useKeyPress;
