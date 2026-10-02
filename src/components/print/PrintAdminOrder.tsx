import { View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { CurrencyCode } from '../../features/currency/currencyConverterUtil';
import { SelectedLanguage } from '../../features/language/languageSlice';
import PdfContainer from './PdfContainer';
import PrintOrderSummary from './printOrderSummary/PrintOrderSummary';
import PrintOrdertable from './printOrderTable/PrintOrdertable';

export interface BasePrintOrderProps {
  language: Record<string, string>;
  order: OrderResponse;
  rates: Record<CurrencyCode, number>;
}

interface PrintAdminOrderProps extends BasePrintOrderProps {
  selectedLanguage: SelectedLanguage;
}

const PrintAdminOrder = ({
  order,
  selectedLanguage,
  language,
  rates,
}: PrintAdminOrderProps) => (
  <PdfContainer
    language={language}
    order={order}
    selectedLanguage={selectedLanguage}
  >
    <View>
      <PrintOrdertable
        language={language}
        orders={order.orderItems}
        currency={order.payment.currency}
        rates={rates}
      />
      <PrintOrderSummary
        language={language}
        summary={order.summary}
        currency={order.payment.currency}
        rates={rates}
      />
    </View>
  </PdfContainer>
);

export default PrintAdminOrder;
