import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const ProfilePage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.profile}>
      <section>
        {language.profile}
        <p>tet</p>
      </section>
    </MainPageContainer>
  );
};

export default ProfilePage;
