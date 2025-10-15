import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
}: MainPageContainerProps) => {
  const ariaLabelledby = `${heading}-title`;

  return (
    <>
      <MetaTags metaTitle={heading} />
      <section
        className={`container ${className}`}
        aria-labelledby={ariaLabelledby}
      >
        <PageHeader heading={heading} ariaLabelledby={ariaLabelledby} />
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onReset}
        >
          {children}
        </ErrorBoundary>
      </section>
    </>
  );
};

export default MainPageContainer;
