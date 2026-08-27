import { ReactNode } from 'react';

interface CartProps {
  children: ReactNode;
  className?: string;
}

const Cart = ({ children, className = '' }: CartProps) => (
  <section className={`cart ${className}`}>{children}</section>
);

export default Cart;
