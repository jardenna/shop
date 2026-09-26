import { ReactNode, useRef } from 'react';
import BtnClose from '../../../../components/BtnClose';
import Portal from '../../../../components/Portal';
import { useAnimate } from '../../../../hooks/useAnimate';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { useKeyPress } from '../../../../hooks/useKeyPress';
import { useScrollLock } from '../../../../hooks/useScrollLock';
import { KeyCode } from '../../../../types/enums';
import './_panel-popup.scss';

interface PanelPopupProps {
  children: ReactNode;
  isOpen: boolean;
  clasName?: string;
  onClosePanel: () => void;
}

const PanelPopup = ({
  children,
  onClosePanel,
  isOpen,
  clasName = '',
}: PanelPopupProps) => {
  const panelRef = useRef<HTMLElement>(null);

  const { shouldRender, transitionState } = useAnimate({
    isOpen,
  });

  useKeyPress(onClosePanel, [KeyCode.Esc]);
  useScrollLock(shouldRender);

  useClickOutside(panelRef, onClosePanel, [panelRef]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId="panel">
      <section
        className={`panel-popup transition from-right ${transitionState} ${clasName}`}
        ref={panelRef}
      >
        {children}

        <BtnClose onClick={onClosePanel} />
      </section>
    </Portal>
  );
};

export default PanelPopup;
