import { useAppSelector } from '../../../app/hooks';
import convertPrice from '../currencyConverterUtil';
import { selectCurrency } from '../currencySlice ';

const currencyToLocaleMap: Record<string, string> = {
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  DKK: 'da-DK',
  SEK: 'sv-SE',
  NOK: 'no-No',
};

// EUR%2CUSD%2CDKK%2CSEK%2CGBP%2CNOK

const formatCurrency = (amount: number, currencyCode: string): string => {
  const locale = currencyToLocaleMap[currencyCode] || 'da-DK'; // Fallback to 'da-DK'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default function ProductPrice({ priceDKK }: { priceDKK: number }) {
  const { selectedCurrency, rates } = useAppSelector(selectCurrency);
  const amount = 2000;
  console.log(formatCurrency(amount, 'DKK'));

  return (
    <p>
      Price: {convertPrice(priceDKK, selectedCurrency, rates)}{' '}
      {selectedCurrency}
    </p>
  );
}
