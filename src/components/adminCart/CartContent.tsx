import type { ReactNode } from 'react';

interface CartContentProps {
  children: ReactNode;
  className?: string;
  heading?: string;
}

const CartContent = ({
  children,
  className = '',
  heading,
}: CartContentProps) => (
  <article className={`admin-cart ${className}`}>
    <span className="cart-top-line" aria-hidden={true} />
    <div className="admin-cart-content">
      {heading && <p className="admin-cart-title">{heading}</p>}
      {children}
    </div>
  </article>
);

export default CartContent;
