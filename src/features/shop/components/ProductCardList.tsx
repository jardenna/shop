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
  className?: string;
};

const ProductCardList = ({
  products,
  className = '',
  ariaLabelledby,
  showSizeOverlay,
  productView,
}: ProductCardListProps) => {
  const { categoryId } = useParams();
  const { language } = useLanguage();

  return (
    <ul className={`product-card-lists ${className}`}>
      {products.map((product) => (
        <li key={product.id}>
          <article aria-labelledby={ariaLabelledby}>
            <div>
              <FavoriteHeart id={product.id} />
              {product.discount > 0 && (
                <Badge
                  badgeText={`- ${product.discount} %`}
                  className="discount"
                />
              )}
              <Link to={categoryId ? product.id : `allProducts/${product.id}`}>
                <VisuallyHidden>
                  {language.view} {product.productName}
                </VisuallyHidden>
                <Img alt="" src={product.images[0]} />
              </Link>
              {showSizeOverlay && (
                <SizeOverlay sizes={product.sizes} count={5} />
              )}
            </div>

            <h2>{product.productName}</h2>
            {productView === 'list' ? (
              <ProductCardListContent product={product} />
            ) : (
              <ProductCardGridContent product={product} />
            )}
          </article>
        </li>
      ))}
    </ul>
  );
};
export default ProductCardList;
