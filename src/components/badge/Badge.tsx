import { ReactNode } from 'react';
import './_badge.scss';

type BadgeProps = {
  badgeText: string;
  className: string;
  tooltip?: ReactNode;
};

const Badge = ({ className, badgeText, tooltip }: BadgeProps) => (
  <div className={`badge ${className}`}>
    <span>{badgeText}</span>
    {tooltip && tooltip}
  </div>
);

export default Badge;
