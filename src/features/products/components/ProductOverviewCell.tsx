import MissingImage from '../../../components/formElements/fileInput/MissingImage';
import Img from '../../../components/Img';

type ProductOverviewCellProps = {
  images: string[];
  productName: string;
};

const ProductOverviewCell = ({
  images,
  productName,
}: ProductOverviewCellProps) => (
  <div className="product-overview-cell">
    {images.length > 0 ? <Img src={images[0]} alt="" /> : <MissingImage />}
    <span className="product-name">{productName}</span>
  </div>
);

export default ProductOverviewCell;
