import { Link } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import Favorites from '../../../components/favorites/Favorites';
import Img from '../../../components/Img';
import ProductColorList from '../../../components/ProductColorList';
import ProductSizeList from '../../../components/productSizeList/ProductSizeList';
import ProductDiscountPrice from '../../products/components/ProductDiscountPrice';
import './ProductCardList.styles.scss';
import SizeOverlay from './SizeOverlay';

type ProductCardListProps = {
  displayList: boolean;
  products: BaseProduct[];
};

const ProductCardList = ({ displayList, products }: ProductCardListProps) => (
  <section className={`product-card-list ${displayList ? 'list' : ''}`}>
    {products.map((product) => (
      <div key={product.id} className="product-card">
        <div className="product-img-container">
          <Favorites id={product.id} />
          {product.discount > 0 && (
            <span className="product-badge">- {product.discount} %</span>
          )}
          <Link to={product.id}>
            <Img alt="" src={product.images[0]} className="product-card-img" />
          </Link>
          {!displayList && (
            <div className="product-overlay-items">
              <SizeOverlay sizes={product.sizes} />
            </div>
          )}
        </div>
        <div className="product-card-content">
          <h2 className="product-card-title">{product.productName}</h2>

          {displayList && <p>{product.description}</p>}
          <ProductDiscountPrice
            price={product.price}
            discount={product.discount || null}
          />
          {displayList && (
            <ProductSizeList sizes={product.sizes} variant="shop-product" />
          )}
          <ProductColorList
            colours={product.colors}
            count={3}
            optionSize={displayList ? '' : 'small'}
          />
        </div>
      </div>
    ))}
  </section>
);

export default ProductCardList;
