import type { ReactNode } from 'react';
import './_label-value-grid.scss';

type LabelValueGridProps = {
  children: ReactNode;
  text: string;
  tooltip?: ReactNode;
};

const LabelValueGrid = ({ children, text, tooltip }: LabelValueGridProps) => (
  <div className="label-value-grid">
    {tooltip ? (
      <div className="tooltip">
        <strong className="label">{text}:</strong>
        {tooltip}
      </div>
    ) : (
      <strong className="label">{text}:</strong>
    )}
    <span className="text">{children}</span>
  </div>
);

export default LabelValueGrid;
