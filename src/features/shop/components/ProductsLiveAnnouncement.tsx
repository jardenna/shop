import VisuallyHidden from '../../../components/VisuallyHidden';

type ProductsLiveAnnouncementProps = {
  announce: boolean;
  infoText: string;
  productsLoadedText: string;
};

const ProductsLiveAnnouncement = ({
  announce,
  infoText,
  productsLoadedText,
}: ProductsLiveAnnouncementProps) => (
  <>
    <p className="products-heading">{infoText}</p>
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
