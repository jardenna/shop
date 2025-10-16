type PaginationInfoTextProps = { ariaDescribedby: string; infoText: string };

const PaginationInfoText = ({
  ariaDescribedby,
  infoText,
}: PaginationInfoTextProps) => (
  <p id={ariaDescribedby} aria-live="polite" aria-atomic="true">
    {infoText}
  </p>
);

export default PaginationInfoText;
