import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PageHeader from '../../adminLayout/PageHeader';
import { adminBreadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import MetaTags from '../../layout/nav/MetaTags';
import './_page-container.scss';

type AdminPageContainerProps = {
  children: ReactNode;
  heading: string;
  linkText?: string;
  linkTo?: string;
  variant?: 'small' | 'medium' | 'large';
  onReset?: () => void;
};

const AdminPageContainer = ({
  children,
  heading,
  linkText,
  linkTo,
  onReset,
  variant = 'large',
}: AdminPageContainerProps) => (
  <article className={`admin-page page-${variant}`}>
    <MetaTags metaTitle={heading} />

    <PageHeader
      heading={heading}
      linkText={linkText}
      linkTo={linkTo}
      routeList={adminBreadcrumbsList}
    />
    <div className="page-card">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        {children}
      </ErrorBoundary>
    </div>
  </article>
);

export default AdminPageContainer;
