import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { adminBreadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import MetaTags from '../../layout/nav/MetaTags';
import './_page-container.scss';

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
    <MetaTags metaTitle={heading} />
    <Breadcrumbs routeList={adminBreadcrumbsList} currentLabel={heading} />
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
