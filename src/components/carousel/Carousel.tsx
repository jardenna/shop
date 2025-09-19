import type { ImgExtention } from '../../types/types';
import Picture from '../Picture';
import './_carousel.scss';

export type CarouselList = {
  alt: string;
  imgName: string;
  imgExtention?: ImgExtention;
};

type CarouselProps = {
  carouselList: CarouselList[];
};

const Carousel = ({ carouselList }: CarouselProps) => (
  <ul className="carousel">
    {carouselList.map(({ alt, imgName, imgExtention }, index) => (
      <li className="carousel-item" key={index}>
        <Picture
          srcSet={`${imgName}.avif`}
          alt={alt}
          src={`${imgName}.${imgExtention}`}
        />
      </li>
    ))}
  </ul>
);

export default Carousel;
