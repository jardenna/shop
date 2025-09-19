import useLanguage from '../features/language/useLanguage';
import MainCollections from '../features/shop/components/MainCollections';
import './MainCollectionPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const CollectionLandingPage = () => {
  const { language } = useLanguage();
  const collectionImages: Record<string, string[]> = {
    Women: ['women', 'women_2', 'women_3'],
    Men: ['men'],
    Kids: ['kids'],
  };

  const categoryOrder = ['Kids', 'Men', 'Women'];

  return (
    <MainPageContainer heading={language.collection}>
      <MainCollections
        collectionImages={collectionImages}
        categoryOrder={categoryOrder}
      />
    </MainPageContainer>
  );
};

export default CollectionLandingPage;
