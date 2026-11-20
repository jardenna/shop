import { useEffect, useRef } from 'react';
import type { KeyCodeValue } from '../types/types';

export function useKeyPress(
  callback: () => void,
  keyCombination: KeyCodeValue[],
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

    const pressedKeys = new Set<KeyCodeValue>();

    const downHandler = (event: KeyboardEvent) => {
      if (!keyCombination.includes(event.code as KeyCodeValue)) {
        return;
      }

      if (event.repeat) {
        return;
      }

      event.preventDefault();
      pressedKeys.add(event.code as KeyCodeValue);

      if (keyCombination.every((key) => pressedKeys.has(key))) {
        callbackRef.current();
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      pressedKeys.delete(event.code as KeyCodeValue);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [enabled, ...keyCombination]);
}
