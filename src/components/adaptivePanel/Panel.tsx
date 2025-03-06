import { FC, ReactNode } from 'react';
import BtnClose from '../BtnClose';
import './_panel.scss';

export type Variant = 'left' | 'right' | 'top' | 'bottom';

interface PanelProps {
  children: ReactNode;
  id: string;
  isPanelHidden: boolean;
  className?: string;
  onTogglePanel?: () => void;
  variant?: Variant;
}

const Panel: FC<PanelProps> = ({
  children,
  isPanelHidden,
  onTogglePanel,
  className = '',
  id,
  variant = 'right',
}) => (
  <article
    className={`panel ${variant} ${className} ${isPanelHidden ? '' : 'is-active'}`}
    id={id}
  >
    {onTogglePanel && <BtnClose onClick={onTogglePanel} />}
    {children}
  </article>
);

export default Panel;
