import { Text, View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import PrintContainer from './PrintContainer';
import { styles } from './styles';

interface PrintAdminOrderProps {
  order: OrderResponse;
}

const PrintAdminOrder = ({ order }: PrintAdminOrderProps) => (
  <PrintContainer>
    <View style={styles.section}>
      {order.orderItems.map((orderitem) => (
        <Text key={orderitem.id} style={styles.label}>
          {orderitem.countInStock}
        </Text>
      ))}
    </View>

    <View style={styles.section}>
      <Text style={styles.label}>Customer</Text>
      <Text style={styles.text}>{order.message}</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.label}>Order</Text>
    </View>
  </PrintContainer>
);

export default PrintAdminOrder;
