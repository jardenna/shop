import { ReactNode } from 'react';

interface SkeletonFormCartProps {
  children: ReactNode;
}

const SkeletonFormCart = ({ children }: SkeletonFormCartProps) => (
  <div className="cart">{children}</div>
);

export default SkeletonFormCart;
