import { View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { CurrencyCode } from '../../features/currency/currencyConverterUtil';
import { SelectedLanguage } from '../../features/language/languageSlice';
import PdfContainer from './PdfContainer';
import PrintOrderSummary from './printOrderSummary/PrintOrderSummary';
import PrintOrdertable from './printOrderTable/PrintOrdertable';
import { styles } from './styles';

export interface BasePrintOrderProps {
  language: Record<string, string>;
  order: OrderResponse;
  rates: Record<CurrencyCode, number>;
}

interface PrintOrderProps extends BasePrintOrderProps {
  selectedLanguage: SelectedLanguage;
}

const PrintOrder = ({
  order,
  selectedLanguage,
  language,
  rates,
}: PrintOrderProps) => (
  <PdfContainer
    language={language}
    order={order}
    selectedLanguage={selectedLanguage}
  >
    <View style={styles.alignContentCenter}>
      <PrintOrdertable
        language={language}
        orders={order.orderItems}
        currency={order.payment.currency}
        rates={rates}
      />
      <PrintOrderSummary
        language={language}
        summary={order.summary}
        discount={order.discount}
        currency={order.payment.currency}
        rates={rates}
        cancelled={order.delivery.status === 'cancelled'}
      />
    </View>
  </PdfContainer>
);

export default PrintOrder;
