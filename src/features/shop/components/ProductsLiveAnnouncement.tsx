import VisuallyHidden from '../../../components/VisuallyHidden';
import HeadingElement from '../../../layout/HeadingElement';

type ProductsLiveAnnouncementProps = {
  announce: boolean;
  ariaDescribedby: string;
  infoText: string;
  productsLoadedText: string;
};

const ProductsLiveAnnouncement = ({
  announce,
  ariaDescribedby,
  infoText,
  productsLoadedText,
}: ProductsLiveAnnouncementProps) => (
  <>
    <HeadingElement
      ariaLabelledby={ariaDescribedby}
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
