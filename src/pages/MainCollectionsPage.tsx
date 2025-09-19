import useLanguage from '../features/language/useLanguage';
import MainCollections from '../features/shop/components/MainCollections';
import './MainCollectionPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const CollectionLandingPage = () => {
  const { language } = useLanguage();
  const collectionImages: Record<string, string[]> = {
    Women: [
      '/images/adImages/women.jpg',
      '/images/collections/women/women_2.jpg',
      '/images/collections/women/women_3.jpg',
    ],
    Men: ['/images/adImages/men.jpg'],
    Kids: ['/images/adImages/kids.jpg'],
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
