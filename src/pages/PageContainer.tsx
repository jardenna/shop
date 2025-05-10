import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import PageHeader from '../components/PageHeader';

type PageContainerProps = {
  children: ReactNode;
  heading: string;
  linkText?: string;
  linkTo?: string;
  onReset?: () => void;
};

const PageContainer = ({
  children,
  heading,
  linkText,
  linkTo,
  onReset,
}: PageContainerProps) => (
  <>
    <PageHeader heading={heading} linkText={linkText} linkTo={linkTo} />
    <div className="page-card">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        {children}
      </ErrorBoundary>
    </div>
  </>
);

export default PageContainer;
