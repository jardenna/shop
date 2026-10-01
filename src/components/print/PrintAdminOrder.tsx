import { Text, View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { SelectedLanguage } from '../../features/language/languageSlice';
import { formatDate } from './formatdate';
import PdfContainer from './PdfContainer';
import { styles } from './styles';

interface PrintAdminOrderProps {
  language: Record<string, string>;
  order: OrderResponse;
  selectedLanguage: SelectedLanguage;
}

const PrintAdminOrder = ({
  order,
  selectedLanguage,
  language,
}: PrintAdminOrderProps) => (
  <PdfContainer language={language}>
    <View style={styles.section}>
      <Text>{formatDate(order.createdAt, selectedLanguage)}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.quantity}>Quantity</Text>
          <Text style={styles.price}>Unit price</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>

        {order.orderItems.map((item) => (
          <View key={item.productName} style={styles.tableRow}>
            <Text style={styles.description}>{item.productName}</Text>
            <Text style={styles.quantity}>{item.qty}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.amount}>{item.qty * item.price}</Text>
          </View>
        ))}
      </View>
    </View>
  </PdfContainer>
);

export default PrintAdminOrder;
