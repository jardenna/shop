import { Text, View } from '@react-pdf/renderer';
import { Order } from '../../../app/api/apiTypes/cartApiTypes';
import {
  CurrencyCode,
  getFormattedPrice,
} from '../../../features/currency/currencyConverterUtil';
import { BasePrintOrderProps } from '../PrintAdminOrder';
import { tableStyles } from './tableStyles.';

type BasePrintOrdertableProps = Pick<BasePrintOrderProps, 'language' | 'rates'>;

interface PrintOrdertableProps extends BasePrintOrdertableProps {
  currency: CurrencyCode;
  orders: Order[];
}

const PrintOrdertable = ({
  orders,
  language,
  currency,
  rates,
}: PrintOrdertableProps) => (
  <View style={tableStyles.table}>
    <View style={tableStyles.tableHeader}>
      <Text style={tableStyles.description}>{language.description}</Text>
      <Text style={tableStyles.quantity}>{language.quantity}</Text>
      <Text style={tableStyles.price}>{language.price}</Text>
      <Text style={tableStyles.amount}>{language.subTotal}</Text>
    </View>

    {orders.map((item) => {
      const convertedPrice = getFormattedPrice(item.price, currency, rates);

      const convertedAmount = getFormattedPrice(
        item.qty * item.price,
        currency,
        rates,
      );

      return (
        <View key={item.productName} style={tableStyles.tableRow}>
          <Text style={tableStyles.description}>{item.productName}</Text>
          <Text style={tableStyles.quantity}>{item.qty}</Text>
          <Text style={tableStyles.price}>{convertedPrice}</Text>
          <Text style={tableStyles.amount}>{convertedAmount}</Text>
        </View>
      );
    })}
  </View>
);

export default PrintOrdertable;
