import { useEffect, useRef } from 'react';
import { KeyCode } from '../types/enums';

export function useKeyPress(
  callback: () => void,
  keyCombination: KeyCode[],
  enabled = true,
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const pressedKeys = new Set<KeyCode>();

    const downHandler = (event: KeyboardEvent) => {
      if (!keyCombination.includes(event.code as KeyCode)) {
        return;
      }

      if (event.repeat) {
        return;
      }

      event.preventDefault();
      pressedKeys.add(event.code as KeyCode);

      if (keyCombination.every((key) => pressedKeys.has(key))) {
        callbackRef.current();
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      pressedKeys.delete(event.code as KeyCode);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [enabled, ...keyCombination]);
}
