import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';

type CardContentProps = {
  children: ReactNode;
  className?: string;
  heading?: string;
  onReset?: () => void;
};

const CardContent = ({
  children,
  className = '',
  heading,
  onReset,
}: CardContentProps) => (
  <article className={`admin-card ${className}`}>
    <span className="card-top-line" aria-hidden={true} />
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <div className="admin-card-content">
        {heading && <p className="admin-card-title">{heading}</p>}
        {children}
      </div>
    </ErrorBoundary>
  </article>
);

export default CardContent;
