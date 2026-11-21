import { Link, useLocation } from 'react-router';
import MissingImage from '../../../components/formElements/fileInput/MissingImage';
import Img from '../../../components/Img';
import { AdminPath } from '../../../layout/nav/navConstants';
import './productOverview.styles.scss';

interface ProductOverviewCellProps {
  id: string;
  images: string[];
  productName: string;
}

const ProductOverviewCell = ({
  images,
  productName,
  id,
}: ProductOverviewCellProps) => {
  const location = useLocation();

  return (
    <Link
      to={`${AdminPath.AdminProductView}/${id}`}
      state={{
        returnTo: `${location.pathname}${location.search}`,
      }}
      className="product-overview-cell"
    >
      {images.length > 0 ? <Img src={images[0]} alt="" /> : <MissingImage />}
      <span className="product-name">{productName}</span>
    </Link>
  );
};

export default ProductOverviewCell;
