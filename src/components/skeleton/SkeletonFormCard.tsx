import type { ReactNode } from 'react';

interface SkeletonFormCardProps {
  children: ReactNode;
}

const SkeletonFormCard = ({ children }: SkeletonFormCardProps) => (
  <div className="card">{children}</div>
);

export default SkeletonFormCard;
