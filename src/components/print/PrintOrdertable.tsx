import { Text, View } from '@react-pdf/renderer';
import { Order } from '../../app/api/apiTypes/cartApiTypes';
import {
  CurrencyCode,
  getFormattedPrice,
} from '../../features/currency/currencyConverterUtil';
import { styles } from './styles';

interface PrintOrdertableProps {
  currency: CurrencyCode;
  language: Record<string, string>;
  orders: Order[];
  rates: Record<CurrencyCode, number>;
}

const PrintOrdertable = ({
  orders,
  language,
  currency,
  rates,
}: PrintOrdertableProps) => (
  <View style={styles.table}>
    <View style={styles.tableHeader}>
      <Text style={styles.description}>{language.description}</Text>
      <Text style={styles.quantity}>{language.quantity}</Text>
      <Text style={styles.price}>{language.price}</Text>
      <Text style={styles.amount}>{language.amount}</Text>
    </View>

    {orders.map((item) => {
      const convertedPrice = getFormattedPrice(item.price, currency, rates);

      const convertedAmount = getFormattedPrice(
        item.qty * item.price,
        currency,
        rates,
      );

      return (
        <View key={item.productName} style={styles.tableRow}>
          <Text style={styles.description}>{item.productName}</Text>
          <Text style={styles.quantity}>{item.qty}</Text>
          <Text style={styles.price}>{convertedPrice}</Text>
          <Text style={styles.amount}>{convertedAmount}</Text>
        </View>
      );
    })}
  </View>
);

export default PrintOrdertable;
