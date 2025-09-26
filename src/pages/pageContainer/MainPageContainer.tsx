import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { breadcrumbsList } from '../../components/breadcrumbs/breadcrumbsLists';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
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
  const { language } = useLanguage();
  return (
    <>
      <MetaTags metaTitle={heading} />
      <article className={`container page ${className}`}>
        <LayoutElement ariaLabel={language.page} className="main-page-header">
          <Breadcrumbs routeList={breadcrumbsList} />
          <h1>{heading}</h1>
        </LayoutElement>

        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onReset}
        >
          {children}
        </ErrorBoundary>
      </article>
    </>
  );
};

export default MainPageContainer;
