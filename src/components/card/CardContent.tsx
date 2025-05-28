import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LayoutElement from '../../layout/LayoutElement';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';

type CardContentProps = {
  children: ReactNode;
  heading: string | null;
  className?: string;
  onReset?: () => void;
};

const CardContent = ({
  children,
  className = '',
  heading,
  onReset,
}: CardContentProps) => (
  <div className={`admin-card card-${className}`}>
    <span className="card-top-line" aria-hidden={true} />
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <section className="admin-card-content">
        {heading && (
          <LayoutElement as="header" ariaLabel="card">
            <h2 className="flex-align-right admin-card-title">{heading}</h2>
          </LayoutElement>
        )}
        {children}
      </section>
    </ErrorBoundary>
  </div>
);

export default CardContent;
