import { ReactNode, useRef } from 'react';
import BtnClose from '../../../../components/BtnClose';
import Portal from '../../../../components/Portal';
import { useAnimate } from '../../../../hooks/useAnimate';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { useKeyPress } from '../../../../hooks/useKeyPress';
import { KeyCode } from '../../../../types/enums';
import './_panel-popup.scss';

interface PanelPopupProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  onClosePanel: () => void;
}

const PanelPopup = ({
  children,
  onClosePanel,
  isOpen,
  className = '',
}: PanelPopupProps) => {
  const panelRef = useRef<HTMLElement>(null);

  const { shouldRender, transitionState } = useAnimate({
    isOpen,
  });

  useKeyPress(onClosePanel, [KeyCode.Esc]);

  useClickOutside(panelRef, onClosePanel, [panelRef]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId="panel">
      <section
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
