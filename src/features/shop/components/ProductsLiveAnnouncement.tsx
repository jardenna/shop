import VisuallyHidden from '../../../components/VisuallyHidden';
import HeadingElement from '../../../layout/HeadingElement';

type ProductsLiveAnnouncementProps = {
  announce: boolean;
  ariaText: string;
  infoText: string;
  productsLoadedText: string;
};

const ProductsLiveAnnouncement = ({
  announce,
  ariaText,
  infoText,
  productsLoadedText,
}: ProductsLiveAnnouncementProps) => (
  <>
    <HeadingElement
      ariaLabelledby={ariaText}
      ariaLive="polite"
      className="products-heading"
    >
      {infoText}
    </HeadingElement>
    {announce && (
      <VisuallyHidden as="p">
        <span aria-live="polite">
          {productsLoadedText} {infoText}
        </span>
      </VisuallyHidden>
    )}
  </>
);

export default ProductsLiveAnnouncement;
