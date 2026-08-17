import { ReactNode } from 'react';

interface CartProps {
  children: ReactNode;
  className?: string;
}

const Cart = ({ children, className = '' }: CartProps) => (
  <div className={`cart ${className}`}>{children}</div>
);

export default Cart;
