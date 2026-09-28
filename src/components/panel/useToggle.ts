import { useState } from 'react';

export const useToggle = () => {
  const [isPanelShown, setIsPanelShown] = useState(false);

  const handleHidePanel = () => {
    setIsPanelShown(false);
  };

  const handleTogglePanel = () => {
    setIsPanelShown((currentState) => !currentState);
  };

  return {
    isPanelShown,
    onTogglePanel: handleTogglePanel,
    onHidePanel: handleHidePanel,
  };
};
