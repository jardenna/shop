import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { KeyCode } from '../types/enums';
import useKeyPress from './useKeyPress';

const useTogglePanel = () => {
  const location = useLocation();
  const [isPanelShown, setIsPanelShown] = useState(false);

  const handleHidePanel = () => {
    setIsPanelShown(false);
  };

  useKeyPress(() => {
    handleHidePanel();
  }, [KeyCode.Esc]);

  const panelRef = useRef<HTMLDivElement>(null);

  const handleTogglePanel = () => {
    setIsPanelShown(!isPanelShown);
  };

  useEffect(() => {
    handleHidePanel();
  }, [location]);

  return {
    isPanelShown,
    onTogglePanel: handleTogglePanel,
    panelRef,
  };
};

export default useTogglePanel;
