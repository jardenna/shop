import { ReactNode, RefObject } from 'react';
import BtnClose from '../BtnClose';
import Overlay from '../overlay/Overlay';

type PanelProps = {
  children: ReactNode;
  isPanelShown: boolean;
  ref: RefObject<HTMLDivElement | null>;
  togglePanelId: string;
  className?: string;
  onHidePanel?: () => void;
};

const Panel = ({
  ref,
  className = '',
  togglePanelId,
  onHidePanel,
  children,
  isPanelShown,
}: PanelProps) => (
  <>
    <div
      ref={ref}
      className={`toggle-panel ${className} ${isPanelShown ? 'shown' : ''}`}
      id={togglePanelId}
    >
      {onHidePanel && <BtnClose onClick={onHidePanel} />}
      {children}
    </div>
    {isPanelShown && <Overlay />}
  </>
);

export default Panel;
