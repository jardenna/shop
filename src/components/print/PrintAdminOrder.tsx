import { View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { CurrencyCode } from '../../features/currency/currencyConverterUtil';
import PdfContainer from './PdfContainer';
import PrintOrdertable from './PrintOrdertable';
import { styles } from './styles';

export interface BasePrintOrderProps {
  language: Record<string, string>;
  order: OrderResponse;
  rates: Record<CurrencyCode, number>;
}

const PrintAdminOrder = ({ order, language, rates }: BasePrintOrderProps) => (
  <PdfContainer language={language} order={order}>
    <View style={styles.content}>
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
