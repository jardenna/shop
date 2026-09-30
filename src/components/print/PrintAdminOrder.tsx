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
      {order.orderItems.map((orderitem) => (
        <Text key={orderitem.id}>
          {orderitem.productName} {language.noData}
        </Text>
      ))}
    </View>
  </PdfContainer>
);

export default PrintAdminOrder;
