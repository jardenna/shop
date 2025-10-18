import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import Skeleton from '../../../components/skeleton/Skeleton';
import MainCollectionsItem, {
  MainCollectionsBaseProps,
} from './MainCollectionsItem';

type MainCollectionsProps = {
  isLoading: boolean;
  mainCollectionList: MainCollectionsBaseProps[];
  onReset: () => void;
};

const MainCollections = ({
  mainCollectionList,
  onReset,
  isLoading,
}: MainCollectionsProps) => (
  <section className="main-collection-container">
    {isLoading && (
      <Skeleton
        count={mainCollectionList.length}
        className="collections-item"
        height="28"
      />
    )}
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      {mainCollectionList.map(
        ({ title, imgList, linkTo, linkText, ariaLabelledby }) => (
          <MainCollectionsItem
            key={title}
            ariaLabelledby={ariaLabelledby}
            imgPath="/images"
            title={title}
            imgList={imgList}
            linkTo={linkTo}
            linkText={linkText}
          />
        ),
      )}
    </ErrorBoundary>
  </section>
);

export default MainCollections;
