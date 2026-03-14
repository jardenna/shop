import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { KeyCode } from '../../types/enums';

interface UseTogglePanelParams {
  preventClickOutside?: boolean;
}

export const useTogglePanel = ({
  preventClickOutside = false,
}: UseTogglePanelParams = {}) => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);
  const [isPanelShown, setIsPanelShown] = useState(false);

  const handleHidePanel = () => {
    setIsPanelShown(false);
  };

  useKeyPress(() => {
    handleHidePanel();
  }, [KeyCode.Esc]);

  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside(panelRef, () => {
    if (!preventClickOutside) {
      handleHidePanel();
    }
  }, [panelRef]);

  const handleTogglePanel = () => {
    setIsPanelShown(!isPanelShown);
  };

  useTrapFocus({ id: 'togglePanel', popupRef: panelRef });

  useScrollLock(isPanelShown);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      handleHidePanel();
      prevPathname.current = pathname; // update ref
    }
  }, [pathname]);

  return {
    isPanelShown,
    onTogglePanel: handleTogglePanel,
    onHidePanel: handleHidePanel,
    panelRef,
  };
};
