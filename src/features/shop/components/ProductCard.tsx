import { Link } from 'react-router';
import Favorites from '../../../components/favorites/Favorites';
import Img from '../../../components/Img';
import './ProductCard.styles.scss';
import ProductCardGridContent from './ProductCardGridContent';
import ProductCardListContent from './ProductCardListContent';
import SizeOverlay from './SizeOverlay';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';

type ProductCardProps = {
  displayList: boolean;
  product: BaseProduct;
};

const ProductCard = ({ displayList, product }: ProductCardProps) => (
  <section className="product-card">
    <div className="product-img-container">
      <Favorites id={product.id} />
      {product.discount > 0 && (
        <span className="product-badge">- {product.discount} %</span>
      )}
      <Link to={product.id}>
        <Img alt="" src={product.images[0]} className="product-card-img" />
      </Link>
      {!displayList && <SizeOverlay sizes={product.sizes} />}
    </div>
    <div className="product-card-content">
      <h2 className="product-card-title">{product.productName}</h2>
      {displayList ? (
        <ProductCardListContent product={product} />
      ) : (
        <ProductCardGridContent product={product} />
      )}
    </div>
  </section>
);

export default ProductCard;
