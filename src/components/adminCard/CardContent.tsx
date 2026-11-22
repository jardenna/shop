import type { ReactNode } from 'react';

interface CardContentProps {
  children: ReactNode;
  className?: string;
  heading?: string;
}

const CardContent = ({
  children,
  className = '',
  heading,
}: CardContentProps) => (
  <article className={`admin-card ${className}`}>
    <span className="card-top-line" aria-hidden={true} />
    <div className="admin-card-content">
      {heading && <p className="admin-card-title">{heading}</p>}
      {children}
    </div>
  </article>
);

export default CardContent;
