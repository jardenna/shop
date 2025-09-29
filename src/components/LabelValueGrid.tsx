import type { ReactNode } from 'react';

type LabelValueGridProps = {
  children: ReactNode;
  text: string;
};

const LabelValueGrid = ({ children, text }: LabelValueGridProps) => (
  <div className="label-value-grid">
    <strong className="label">{text}:</strong>
    <span className="text">{children}</span>
  </div>
);

export default LabelValueGrid;
