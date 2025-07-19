import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
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
        <LayoutElement ariaLabel={language.page} className="main-page-header">
          <Breadcrumbs routeList={breadcrumbsList} />
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
