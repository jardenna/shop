import Img from '../Img';
import './_carousel.scss';

type CarouselProps = {
  galleryList: string[];
};

const Carousel = ({ galleryList }: CarouselProps) => (
  <ul className="carousel">
    {galleryList.map((item, index) => (
      <li className="carousel-item" key={index}>
        <Img src={item} alt="" />
      </li>
    ))}
  </ul>
);

export default Carousel;
