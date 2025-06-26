import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const FavoritesPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.favorites}>
      Favorites
    </MainPageContainer>
  );
};

export default FavoritesPage;
