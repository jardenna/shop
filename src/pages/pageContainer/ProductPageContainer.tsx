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

type ProductPageContainerProps = {
  children: ReactNode;
  heading: string;
  topImg: TopImage;
  className?: string;
  onReset?: () => void;
};

const ProductPageContainer = ({
  children,
  heading,
  onReset,
  topImg,
  className = '',
}: ProductPageContainerProps) => {
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
          <Img src={topImg.src} alt={topImg.alt} />
        </LayoutElement>

        <div className="main-page">
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={onReset}
          >
            <article className="product-page-container">
              <ul className="left-panel">
                <li>Tøj</li>
                <li>Sko</li>
                <li>Accessories</li>
                <li>Legetøj</li>
              </ul>
              <section>
                <h1>{heading}</h1>
                {children}
              </section>
              <div>Filter</div>
            </article>
          </ErrorBoundary>
        </div>
      </article>
    </>
  );
};

export default ProductPageContainer;
