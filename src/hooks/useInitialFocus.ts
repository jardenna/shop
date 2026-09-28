import { useEffect } from 'react';
import { UseTrapFocusProps } from './useTrapFocus';

export const useInitialFocus = ({ popupRef, enabled }: UseTrapFocusProps) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const animationFrameId = requestAnimationFrame(() => {
      const focusableElements = popupRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      const firstFocusableElement = focusableElements?.[0];

      if (!firstFocusableElement) {
        return;
      }

      firstFocusableElement.dataset.initialFocus = 'true';
      firstFocusableElement.focus();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, popupRef]);
};
