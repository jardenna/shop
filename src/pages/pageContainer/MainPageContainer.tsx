import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { routeBreadcrumbs } from '../../components/breadcrumbs/breadcrumbsRoutes';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import MetaTags from '../../layout/nav/MetaTags';
import './_page-container.scss';
import BreCrumbs from '../../components/breadcrumbs/BreCrumbs';

type MainPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
  currentLabel?: string;
  onReset?: () => void;
};

const MainPageContainer = ({
  children,
  heading,
  onReset,
  className = '',
  currentLabel,
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
          <Breadcrumbs
            routeList={routeBreadcrumbs}
            currentLabel={currentLabel || ''}
          />{' '}
          <BreCrumbs />
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
