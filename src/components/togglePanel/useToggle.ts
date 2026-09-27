import { useState } from 'react';

export const useToggle = () => {
  const [isPanelShown, setIsPanelShown] = useState(false);

  const handleHidePanel = () => {
    setIsPanelShown(false);
  };

  const handleTogglePanel = () => {
    setIsPanelShown(!isPanelShown);
  };

  // For mobile nav
  //   const { pathname } = useLocation();
  // const prevPathname = useRef(pathname);
  // useTrapFocus({
  //   popupRef: panelRef,
  //   enabled: isPanelShown,
  // });

  // useScrollLock(isPanelShown);

  // useEffect(() => {
  //   if (prevPathname.current !== pathname) {
  //     handleHidePanel();
  //     prevPathname.current = pathname; // update ref
  //   }
  // }, [pathname]);

  return {
    isPanelShown,
    onTogglePanel: handleTogglePanel,
    onHidePanel: handleHidePanel,
  };
};
