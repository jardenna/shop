import { ReactNode } from 'react';

interface CartProps {
  children: ReactNode;
}

const Cart = ({ children }: CartProps) => (
  <div className="cart">{children}</div>
);

export default Cart;
