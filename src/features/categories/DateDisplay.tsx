type DateDisplayProps = {
  cellContent: string | Date;
  locale: string;
  day?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  year?: 'numeric' | '2-digit' | undefined;
};

const DateDisplay = ({
  cellContent,
  locale,
  day = '2-digit',
  month = 'long',
  year = 'numeric',
}: DateDisplayProps) => (
  <span>
    {new Intl.DateTimeFormat(locale, { day, month, year }).format(
      new Date(cellContent),
    )}
  </span>
);

export default DateDisplay;
