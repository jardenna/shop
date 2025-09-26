import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { breadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/pageHeader/PageHeader';
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
      <PageHeader heading={heading} routeList={breadcrumbsList} />

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
