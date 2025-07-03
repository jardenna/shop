import useLanguage from '../../../features/language/useLanguage';
import MainPageContainer from '../../pageContainer/MainPageContainer';
import './_collection-page.scss';
import MainCollections from './MainCollections';

const CollectionLandingPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.collection}>
      <MainCollections />
    </MainPageContainer>
  );
};

export default CollectionLandingPage;
