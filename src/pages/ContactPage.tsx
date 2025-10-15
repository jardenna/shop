import type { CarouselList } from '../components/carousel/Carousel';
import Carousel from '../components/carousel/Carousel';
import MainPageContainer from './pageContainer/MainPageContainer';

const ContactPage = () => {
  const carouselList: CarouselList[] = [
    { imgName: '/images/women', alt: '' },
    { imgName: '/images/women_2', alt: '' },
    { imgName: '/images/women_3', alt: '' },
    { imgName: '/images/women', alt: '' },
    { imgName: '/images/women_2', alt: '' },
  ];
  return (
    <MainPageContainer heading="contact">
      <Carousel carouselList={carouselList} />
    </MainPageContainer>
  );
};

export default ContactPage;
