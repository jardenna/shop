import { Link } from 'react-router';
import MissingImage from '../../../components/formElements/fileInput/MissingImage';
import Img from '../../../components/Img';
import { AdminPath } from '../../../layout/nav/enums';

type ProductOverviewCellProps = {
  id: string;
  images: string[];
  productName: string;
};

const ProductOverviewCell = ({
  images,
  productName,
  id,
}: ProductOverviewCellProps) => (
  <Link
    to={`${AdminPath.AdminProductView}/${id}`}
    className="product-overview-cell"
  >
    {images.length > 0 ? <Img src={images[0]} alt="" /> : <MissingImage />}
    <span className="product-name">{productName}</span>
  </Link>
);

export default ProductOverviewCell;
