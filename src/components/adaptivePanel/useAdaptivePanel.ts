import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';
import useClickOutside from '../../hooks/useClickOutside';

const useAdaptivePanel = () => {
  const location = useLocation();
  const [isPanelHidden, setIsPanelHidden] = useState(true);

  useKeyPress(() => setIsPanelHidden(true), [KeyCode.Esc]);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTogglePanel = () => {
    setIsPanelHidden(!isPanelHidden);
  };

  const handleHidePanel = () => {
    setIsPanelHidden(true);
  };

  useClickOutside(panelRef, () => handleHidePanel());

  useEffect(() => {
    setIsPanelHidden(true);
  }, [location]);

  return {
    isPanelHidden,
    onTogglePanel: handleTogglePanel,
    onHidePanel: handleHidePanel,
    panelRef,
  };
};

export default useAdaptivePanel;
