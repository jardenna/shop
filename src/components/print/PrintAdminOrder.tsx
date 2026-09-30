import { Text, View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { formatDate } from './formatdate';
import PdfContainer from './PdfContainer';
import { styles } from './styles';

interface PrintAdminOrderProps {
  order: OrderResponse;
}

const PrintAdminOrder = ({ order }: PrintAdminOrderProps) => (
  <PdfContainer>
    <View style={styles.section}>
      <Text>{formatDate(order.createdAt, 'da-DK')}</Text>
      {order.orderItems.map((orderitem) => (
        <Text key={orderitem.id}>{orderitem.productName}</Text>
      ))}
    </View>
  </PdfContainer>
);

export default PrintAdminOrder;
