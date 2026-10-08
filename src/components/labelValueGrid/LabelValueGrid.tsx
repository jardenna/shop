import type { ReactNode } from 'react';
import './_label-value-grid.scss';

interface LabelValueGridProps {
  children: ReactNode;
  text: string;
  tooltip?: ReactNode;
}

const LabelValueGrid = ({ children, text, tooltip }: LabelValueGridProps) => (
  <div className="label-value-grid">
    <div className={`label ${tooltip ? 'tooltip' : ''}`}>
      <strong>{text}:</strong>
      {tooltip}
    </div>

    <span className="text">{children}</span>
  </div>
);

export default LabelValueGrid;
