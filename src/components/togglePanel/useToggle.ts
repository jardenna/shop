import { useState } from 'react';

export const useToggle = () => {
  const [isPanelShown, setIsPanelShown] = useState(false);

  const handleHidePanel = () => {
    setIsPanelShown(false);
  };

  const handleTogglePanel = () => {
    setIsPanelShown(true);
  };

  return {
    isPanelShown,
    onTogglePanel: handleTogglePanel,
    onHidePanel: handleHidePanel,
  };
};
