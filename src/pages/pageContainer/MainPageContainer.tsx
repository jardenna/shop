import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import MetaTags from '../../layout/nav/MetaTags';
import './_page-container.scss';

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
    <article className={`container page ${className}`}>
      <Breadcrumbs />
      <header className="page-header">
        <div className="top-img" />
      </header>
      <h1>{heading}</h1>
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

export default MainPageContainer;
