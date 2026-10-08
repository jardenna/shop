import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

const RouteErrorBoundary = ({ children }: RouteErrorBoundaryProps) => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    {children}
  </ErrorBoundary>
);

export default RouteErrorBoundary;
