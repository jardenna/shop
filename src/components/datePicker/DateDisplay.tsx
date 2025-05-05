import useLanguage from '../../features/language/useLanguage';
import dateToLocaleMap from '../../utils/dates';

type DateDisplayProps = {
  date: Date | string;
  day?: 'numeric' | '2-digit' | undefined;
  hour?: 'numeric' | '2-digit' | undefined;
  minute?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  year?: 'numeric' | '2-digit' | undefined;
};

const DateDisplay = ({
  date,
  day = '2-digit',
  month = 'long',
  year = 'numeric',
  hour,
  minute,
}: DateDisplayProps) => {
  const { selectedLanguage } = useLanguage();

  return (
    <>
      {new Intl.DateTimeFormat(dateToLocaleMap[selectedLanguage], {
        day,
        month,
        year,
        hour,
        minute,
      }).format(new Date(date))}
    </>
  );
};

export default DateDisplay;
