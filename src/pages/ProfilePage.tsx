import Gallery from '../components/gallery/Gallery';
import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const ProfilePage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.profile}>
      <section>{language.profile}</section>
      <Gallery />
    </MainPageContainer>
  );
};

export default ProfilePage;
