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
  <div className={`admin-card ${className}`}>
    <span className="card-top-line" aria-hidden={true} />
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <section className="admin-card-content">
        {heading && <h2 className="admin-card-title">{heading}</h2>}
        {children}
      </section>
    </ErrorBoundary>
  </div>
);

export default CardContent;
