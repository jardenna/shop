import { View } from '@react-pdf/renderer';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { CurrencyCode } from '../../features/currency/currencyConverterUtil';
import { SelectedLanguage } from '../../features/language/languageSlice';
import PdfContainer from './PdfContainer';
import PrintOrdertable from './PrintOrdertable';
import { styles } from './styles';

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
}: PrintAdminOrderProps) => {
  console.log(selectedLanguage);

  return (
    <PdfContainer language={language}>
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
};

export default PrintAdminOrder;
