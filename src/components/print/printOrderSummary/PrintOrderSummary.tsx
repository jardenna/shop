import { Text, View } from '@react-pdf/renderer';
import { OrderResponse } from '../../../app/api/apiTypes/orderApiTypes';
import {
  CurrencyCode,
  getFormattedPrice,
} from '../../../features/currency/currencyConverterUtil';
import { vat } from '../../../utils/utils';
import { BasePrintOrderProps } from '../PrintAdminOrder';
import { summaryStyles } from './summaryStyles';

interface PrintOrderSummaryProps extends Pick<
  BasePrintOrderProps,
  'language' | 'rates'
> {
  currency: CurrencyCode;
  summary: OrderResponse['summary'];
}

const PrintOrderSummary = ({
  language,
  rates,
  currency,
  summary,
}: PrintOrderSummaryProps) => (
  <View style={summaryStyles.summary}>
    <View style={summaryStyles.summaryRow}>
      <Text style={summaryStyles.label}>{language.subTotal}</Text>
      <Text style={summaryStyles.value}>
        {getFormattedPrice(summary.subTotal, currency, rates)}
      </Text>
    </View>

    {summary.promoDiscount > 0 && (
      <View style={summaryStyles.summaryRow}>
        <Text style={summaryStyles.label}>{language.employeeDiscount}</Text>
        <Text style={summaryStyles.value}>
          - {getFormattedPrice(summary.promoDiscount, currency, rates)}
        </Text>
      </View>
    )}
    {summary.discountPrice > 0 && (
      <View style={summaryStyles.summaryRow}>
        <Text style={summaryStyles.label}>{language.discount}</Text>
        <Text style={summaryStyles.value}>
          - {getFormattedPrice(summary.discountPrice, currency, rates)}
        </Text>
      </View>
    )}

    <View style={summaryStyles.summaryRow}>
      <Text style={summaryStyles.label}>{language.estimatedShipping}</Text>
      <Text style={summaryStyles.value}>
        {getFormattedPrice(summary.shippingPrice, currency, rates)}
      </Text>
    </View>

    <View style={summaryStyles.summaryRow}>
      <Text style={summaryStyles.label}>{`${language.vat} (${vat}%)`}</Text>
      <Text style={summaryStyles.value}>
        {getFormattedPrice(summary.taxPrice, currency, rates)}
      </Text>
    </View>

    <View style={summaryStyles.totalRow}>
      <Text style={summaryStyles.totalLabel}>{language.total}</Text>
      <Text style={summaryStyles.totalValue}>
        {getFormattedPrice(summary.totalPrice, currency, rates)}
      </Text>
    </View>
  </View>
);

export default PrintOrderSummary;
