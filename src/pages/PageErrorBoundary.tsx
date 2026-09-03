import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';

interface PageErrorBoundaryProps {
  children: ReactNode;
}

const PageErrorBoundary = ({ children }: PageErrorBoundaryProps) => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    {children}
  </ErrorBoundary>
);

export default PageErrorBoundary;
