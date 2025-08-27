import Img from '../Img';
import './_gallery.scss';

type GaleryProps = {
  galleryList: string[];
};

const Gallery = ({ galleryList }: GaleryProps) => (
  <ul className="carousel">
    {galleryList.map((item) => (
      <li className="carousel-item" key={item}>
        <Img src={item} alt="" />
      </li>
    ))}
  </ul>
);

export default Gallery;
