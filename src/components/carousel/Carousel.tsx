import Img from '../Img';
import './_carousel.scss';

type CarouselProps = {
  carouselList: string[];
};

const Carousel = ({ carouselList }: CarouselProps) => (
  <ul className="carousel">
    {carouselList.map((item, index) => (
      <li className="carousel-item" key={index}>
        <Img src={item} alt="" />
      </li>
    ))}
  </ul>
);

export default Carousel;
