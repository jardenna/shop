import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import Img from '../../components/Img';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import MetaTags from '../../layout/nav/MetaTags';
import { routeList } from '../../routes/routeConfig';
import './_page-container.scss';

export type TopImage = {
  alt: string;
  src: string;
};

type MainPageContainerProps = {
  children: ReactNode;
  heading: string;
  className?: string;
  topImg?: TopImage;
  onReset?: () => void;
};

const MainPageContainer = ({
  children,
  heading,
  onReset,
  topImg,
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
          <Breadcrumbs routeList={routeList} />
          {topImg && <Img src={topImg.src} alt={topImg.alt} />}
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
