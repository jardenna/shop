import { Text, View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { SelectedLanguage } from '../../features/language/languageSlice';
import { formatDate } from './formatdate';
import PdfContainer from './PdfContainer';
import PrintOrdertable from './PrintOrdertable';

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
    <View>
      <Text>{formatDate(order.createdAt, selectedLanguage)}</Text>
      <PrintOrdertable language={language} orders={order.orderItems} />
    </View>
  </PdfContainer>
);

export default PrintAdminOrder;
