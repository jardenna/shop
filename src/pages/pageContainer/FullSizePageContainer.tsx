import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import MetaTags from '../../layout/nav/MetaTags';
import './_page-container.scss';

type FullSizePageContainerProps = {
  children: ReactNode;
  metaTitle: string;
  className?: string;
  onReset?: () => void;
};

const FullSizePageContainer = ({
  children,
  metaTitle,
  onReset,
  className,
}: FullSizePageContainerProps) => (
  <>
    <MetaTags metaTitle={metaTitle} />
    <article className={className}>
      <div className="main-page">
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onReset}
        >
          {children}
        </ErrorBoundary>
      </div>
    </article>
  </>
);

export default FullSizePageContainer;
