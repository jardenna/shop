import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import AdminPageHeader from '../../adminLayout/AdminPageHeader';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import MetaTags from '../../layout/nav/MetaTags';

type MainPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
  onReset?: () => void;
};

const MainPageContainer = ({
  children,
  heading,
  onReset,
  className = '',
}: MainPageContainerProps) => (
  <>
    <MetaTags metaTitle={heading} />
    <article className={`container ${className}`}>
      <AdminPageHeader heading={heading} />

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        {children}
      </ErrorBoundary>
    </article>
  </>
);

export default MainPageContainer;
