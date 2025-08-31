import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import useClickOutside from '../../hooks/useClickOutside';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';

const useTogglePanel = ({
  preventClickOutside,
}: {
  preventClickOutside: boolean;
}) => {
  const location = useLocation();
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

  useEffect(() => {
    if (isPanelShown) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isPanelShown]);

  useEffect(() => {
    handleHidePanel();
  }, [location]);

  return {
    isPanelShown,
    onTogglePanel: handleTogglePanel,
    onHidePanel: handleHidePanel,
    panelRef,
  };
};

export default useTogglePanel;
