import type { ReactElement } from 'react';

interface SkeletonFormCartProps {
  children: ReactElement;
}

const SkeletonFormCart = ({ children }: SkeletonFormCartProps) => (
  <div className="cart">{children}</div>
);

export default SkeletonFormCart;
