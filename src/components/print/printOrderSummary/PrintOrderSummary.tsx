import { Text, View } from '@react-pdf/renderer';
import { Discount, Summary } from '../../../app/api/apiTypes/sharedApiTypes';
import {
  CurrencyCode,
  getFormattedPrice,
} from '../../../features/currency/currencyConverterUtil';
import { vat } from '../../../utils/utils';
import { BasePrintOrderProps } from '../PrintAdminOrder';
import { styles } from '../styles';
import PrintSummaryItem from './PrintSummaryItem';
import { summaryStyles } from './summaryStyles';

interface PrintOrderSummaryProps extends Pick<
  BasePrintOrderProps,
  'language' | 'rates'
> {
  cancelled: boolean;
  currency: CurrencyCode;
  discount: Discount;
  summary: Summary;
}

const PrintOrderSummary = ({
  language,
  rates,
  currency,
  summary,
  discount,
  cancelled,
}: PrintOrderSummaryProps) => (
  <View style={summaryStyles.summary}>
    <View style={summaryStyles.summaryTable}>
      <PrintSummaryItem
        label={language.subTotal}
        value={getFormattedPrice(summary.subTotal, currency, rates)}
      />

      {summary.promoDiscount > 0 && (
        <PrintSummaryItem
          isDiscount
          label={language[discount.label]}
          value={getFormattedPrice(summary.promoDiscount, currency, rates)}
        />
      )}
      {summary.discountPrice > 0 && (
        <PrintSummaryItem
          isDiscount
          label={language.sale}
          value={getFormattedPrice(summary.discountPrice, currency, rates)}
        />
      )}
      <PrintSummaryItem
        label={language.estimatedShipping}
        value={getFormattedPrice(summary.shippingPrice, currency, rates)}
      />
      <PrintSummaryItem
        label={`${language.vat} (${vat}%)`}
        value={getFormattedPrice(summary.taxPrice, currency, rates)}
      />
    </View>

    <View style={summaryStyles.totalRow}>
      <Text style={summaryStyles.totalLabel}>{language.totalPrice}</Text>
      <Text
        style={[
          summaryStyles.totalValue,
          ...(cancelled ? [styles.cancelledValue] : []),
        ]}
      >
        {getFormattedPrice(summary.totalPrice, currency, rates)}
      </Text>
    </View>
  </View>
);

export default PrintOrderSummary;
