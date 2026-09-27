import { ReactNode, useRef } from 'react';
import BtnClose from '../../../../components/BtnClose';
import Portal from '../../../../components/Portal';
import { useAnimate } from '../../../../hooks/useAnimate';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { useKeyPress } from '../../../../hooks/useKeyPress';
import { useTrapFocus } from '../../../../hooks/useTrapFocus';
import { KeyCode } from '../../../../types/enums';
import './_panel-popup.scss';

interface PanelPopupProps {
  children: ReactNode;
  isOpen: boolean;
  ariaControls?: string;
  className?: string;
  trapFocus?: boolean;
  onClosePanel: () => void;
}

const PanelPopup = ({
  children,
  onClosePanel,
  isOpen,
  className = '',
  ariaControls,
  trapFocus,
}: PanelPopupProps) => {
  const panelRef = useRef<HTMLElement>(null);

  const { shouldRender, transitionState } = useAnimate({
    isOpen,
  });

  useTrapFocus({
    popupRef: panelRef,
    enabled: Boolean(trapFocus && isOpen),
  });

  useKeyPress(onClosePanel, [KeyCode.Esc]);

  useClickOutside(panelRef, onClosePanel, [panelRef]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId="panel">
      <section
        id={ariaControls}
        className={`panel-popup transition from-right ${transitionState} ${className}`}
        ref={panelRef}
      >
        {children}

        <BtnClose onClick={onClosePanel} />
      </section>
    </Portal>
  );
};

export default PanelPopup;
