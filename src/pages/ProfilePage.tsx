import type { CarouselList } from '../components/carousel/Carousel';
import Carousel from '../components/carousel/Carousel';
import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const ProfilePage = () => {
  const { language } = useLanguage();

  const carouselList: CarouselList[] = [
    { imgName: '/images/adImages/women', alt: '' },
    { imgName: '/images/adImages/women_2', alt: '' },
    { imgName: '/images/adImages/women_3', alt: '' },
    { imgName: '/images/adImages/women', alt: '' },
    { imgName: '/images/adImages/women_2', alt: '' },
  ];

  return (
    <MainPageContainer heading={language.profile}>
      <section>{language.profile}</section>
      <Carousel carouselList={carouselList} />
    </MainPageContainer>
  );
};

export default ProfilePage;
