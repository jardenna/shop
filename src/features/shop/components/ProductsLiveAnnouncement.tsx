import VisuallyHidden from '../../../components/VisuallyHidden';

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
    <p id={ariaDescribedby} aria-live="polite">
      {infoText}
    </p>
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
