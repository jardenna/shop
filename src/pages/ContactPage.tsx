import type { CarouselList } from '../components/carousel/Carousel';
import Carousel from '../components/carousel/Carousel';
import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const ContactPage = () => {
  const { language } = useLanguage();
  const carouselList: CarouselList[] = [
    { imgName: '/images/women', alt: '' },
    { imgName: '/images/women_2', alt: '' },
    { imgName: '/images/women_3', alt: '' },
    { imgName: '/images/women', alt: '' },
    { imgName: '/images/women_2', alt: '' },
  ];
  return (
    <MainPageContainer heading={language.contact}>
      <Carousel carouselList={carouselList} />
    </MainPageContainer>
  );
};

export default ContactPage;
