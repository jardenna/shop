import VisuallyHidden from '../../../components/VisuallyHidden';

type PaginationInfoTextProps = {
  announce: boolean;
  ariaDescribedby: string;
  infoText: string;
  productsLoadedText: string;
};

const PaginationInfoText = ({
  announce,
  ariaDescribedby,
  infoText,
  productsLoadedText,
}: PaginationInfoTextProps) => (
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

export default PaginationInfoText;
