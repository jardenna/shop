import { Link } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import Img from '../../../components/Img';
import './ProductCard.styles.scss';
import ProductCardGridContent from './ProductCardGridContent';
import ProductCardListContent from './ProductCardListContent';
import SizeOverlay from './SizeOverlay';

type ProductCardProps = {
  product: BaseProduct;
  categoryId?: string;
  displayList?: boolean;
};

const ProductCard = ({
  displayList,
  product,
  categoryId,
}: ProductCardProps) => (
  <section className="product-card">
    <div className="product-img-container">
      <FavoriteHeart id={product.id} />
      {product.discount > 0 && (
        <span className="product-badge">- {product.discount} %</span>
      )}
      <Link to={categoryId ? product.id : `allProducts/${product.id}`}>
        <Img alt="" src={product.images[0]} className="product-card-img" />
      </Link>
      {!displayList && <SizeOverlay sizes={product.sizes} count={5} />}
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
