import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/pageHeader/PageHeader';
import MetaTags from '../../layout/nav/MetaTags';

type AdminPageContainerProps = {
  ariaLabelledby: string;
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
  ariaLabelledby,
}: AdminPageContainerProps) => {
  const ariaTitle = `${ariaLabelledby}-title`;

  return (
    <section
      className={`admin-page page-${variant}`}
      aria-labelledby={ariaTitle}
    >
      <MetaTags metaTitle={heading} />
      <PageHeader
        heading={heading}
        linkText={linkText}
        linkTo={linkTo}
        ariaLabelledby={ariaTitle}
      />
      <div className="page-card">
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onReset}
        >
          {children}
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default AdminPageContainer;
