import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { routeBreadcrumbs } from '../../components/breadcrumbs/breadcrumbsRoutes';
import UnifiedBreadcrumbs from '../../components/breadcrumbs/UnifiedBreadcrumbs';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
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
}: MainPageContainerProps) => {
  const { language } = useLanguage();
  return (
    <>
      <MetaTags metaTitle={heading} />
      <article className={`container page ${className}`}>
        <LayoutElement
          ariaLabel={language.page}
          as="header"
          className="main-page-header"
        >
          <UnifiedBreadcrumbs routeList={routeBreadcrumbs} />
          <h1>{heading}</h1>
        </LayoutElement>

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
};

export default MainPageContainer;
