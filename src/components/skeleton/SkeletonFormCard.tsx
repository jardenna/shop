import type { ReactNode } from 'react';

interface SkeletonFormCardProps {
  children: ReactNode;
}

const SkeletonFormCard = ({ children }: SkeletonFormCardProps) => (
  <div className="cart">{children}</div>
);

export default SkeletonFormCard;
