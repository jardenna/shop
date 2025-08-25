import Img from './Img';

type ImgListProps = {
  images: string[];
};

const ImgList = ({ images }: ImgListProps) => (
  <ul className="product-img-list">
    {images.map((url) => (
      <li key={url}>
        <Img src={url} alt="" className="product-img" />
      </li>
    ))}
  </ul>
);

export default ImgList;
