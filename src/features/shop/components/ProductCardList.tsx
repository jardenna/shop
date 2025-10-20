import { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import Badge from '../../../components/Badge';
import FavoriteHeart from '../../../components/favorites/FavoriteHeart';
import Img from '../../../components/Img';
import VisuallyHidden from '../../../components/VisuallyHidden';
import useLanguage from '../../language/useLanguage';
import ProductCardGridContent from './ProductCardGridContent';
import ProductCardListContent from './ProductCardListContent';
import SizeOverlay from './SizeOverlay';

type ProductCardListProps = {
  ariaLabelledby: string;
  products: BaseProduct[];
  productView: ReactNode;
  showSizeOverlay: boolean;
};

const ProductCardList = ({
  products,
  ariaLabelledby,
  showSizeOverlay,
  productView,
}: ProductCardListProps) => {
  const { categoryId } = useParams();
  const { language } = useLanguage();

  return (
    <ul className={`product-card-list ${productView}`}>
      {products.map((product) => (
        <li key={product.id} className="product-card-item">
          <article aria-labelledby={ariaLabelledby} className="product-card">
            <FavoriteHeart id={product.id} />
            <Link
              to={categoryId ? product.id : `allProducts/${product.id}`}
              aria-labelledby={ariaLabelledby}
              className="product-card-link"
            >
              <VisuallyHidden>
                {language.view} {product.productName}
              </VisuallyHidden>
              <div className="card-img-container">
                {product.discount > 0 && (
                  <Badge
                    badgeText={`- ${product.discount} %`}
                    className="discount"
                  />
                )}
                <Img alt="" src={product.images[0]} />
                {showSizeOverlay && (
                  <SizeOverlay sizes={product.sizes} count={5} />
                )}
              </div>
              <div className="card-text-container">
                <h2 id={ariaLabelledby}>{product.productName}</h2>
                {productView === 'list' ? (
                  <ProductCardListContent product={product} />
                ) : (
                  <ProductCardGridContent product={product} />
                )}
              </div>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
};
export default ProductCardList;
