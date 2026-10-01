import { Text, View } from '@react-pdf/renderer';
import { Order } from '../../app/api/apiTypes/cartApiTypes';
import { styles } from './styles';

interface PrintOrdertableProps {
  language: Record<string, string>;
  orders: Order[];
}

const PrintOrdertable = ({ orders, language }: PrintOrdertableProps) => (
  <View style={styles.table}>
    <View style={styles.tableHeader}>
      <Text style={styles.description}>{language.description}</Text>
      <Text style={styles.quantity}>{language.quantity}</Text>
      <Text style={styles.price}>{language.price}</Text>
      <Text style={styles.amount}>{language.amount}</Text>
    </View>

    {orders.map((item) => (
      <View key={item.productName} style={styles.tableRow}>
        <Text style={styles.description}>{item.productName}</Text>
        <Text style={styles.quantity}>{item.qty}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.amount}>{item.qty * item.price}</Text>
      </View>
    ))}
  </View>
);

export default PrintOrdertable;
