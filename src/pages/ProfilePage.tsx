import Gallery from '../components/gallery/Gallery';
import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const ProfilePage = () => {
  const { language } = useLanguage();

  const galleryList = [
    '/images/collections/women/women.jpg',
    '/images/collections/women/women_2.jpg',
    '/images/collections/women/women_3.jpg',
    '/images/collections/women/women.jpg',
    '/images/collections/women/women_2.jpg',
    '/images/uploads/images-1748539545452.jpg',
    '/images/uploads/images-1748539545454.jpg',
  ];

  return (
    <MainPageContainer heading={language.profile}>
      <section>{language.profile}</section>
      <Gallery galleryList={galleryList} />
    </MainPageContainer>
  );
};

export default ProfilePage;
