import useLanguage from '../features/language/useLanguage';
import MainCollections from '../features/shop/components/MainCollections';
import './MainCollectionPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const CollectionLandingPage = () => {
  const { language } = useLanguage();
  const collectionImages: Record<string, string[]> = {
    Women: [
      '/images/collections/women/women.jpg',
      '/images/collections/women/women_2.jpg',
      '/images/collections/women/women_3.jpg',
    ],
    Men: ['/images/collections/men/men.jpg'],
    Kids: ['/images/collections/kids/kids.jpg'],
  };

  const categoryOrder = ['Kids', 'Men', 'Women', 'Sofa'];

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
