import useLanguage from '../features/language/useLanguage';
import MainCollections from '../features/shop/components/MainCollections';
import './MainCollectionPage.styles.scss';
import MainPageContainer from './pageContainer/MainPageContainer';

const CollectionLandingPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.collection}>
      <MainCollections />
    </MainPageContainer>
  );
};

export default CollectionLandingPage;
