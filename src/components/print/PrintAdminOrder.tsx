import { Text, View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { SelectedLanguage } from '../../features/language/languageSlice';
import { formatDate } from './formatdate';
import PdfContainer from './PdfContainer';
import PrintOrdertable from './PrintOrdertable';
import { CurrencyCode } from '../../features/currency/currencyConverterUtil';

interface PrintAdminOrderProps {
  language: Record<string, string>;
  order: OrderResponse;
  rates: Record<CurrencyCode, number>;
  selectedLanguage: SelectedLanguage;
}

const PrintAdminOrder = ({
  order,
  selectedLanguage,
  language,
  rates,
}: PrintAdminOrderProps) => (
  <PdfContainer language={language}>
    <View>
      <Text>{formatDate(order.createdAt, selectedLanguage)}</Text>
      <PrintOrdertable
        language={language}
        orders={order.orderItems}
        currency={order.payment.currency}
        rates={rates}
      />
    </View>
  </PdfContainer>
);

export default PrintAdminOrder;
