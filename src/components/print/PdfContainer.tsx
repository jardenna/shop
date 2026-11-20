import { Document, Page, Text, View } from '@react-pdf/renderer';
import type { ReactElement } from 'react';
import type { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import type { SelectedLanguage } from '../../features/language/languageSlice';
import type { Language } from '../../types/types';
import OrderLogo from './OrderLogo';
import PrintOrderFooter from './printOrderFooter/PrintOrderFooter';
import PrintOrderHeader from './PrintOrderHeader';
import { styles } from './styles';

interface PdfContainerProps {
  children: ReactElement;
  language: Language;
  order: OrderResponse;
  selectedLanguage: SelectedLanguage;
}

const PdfContainer = ({
  children,
  language,
  order,
  selectedLanguage,
}: PdfContainerProps) => {
  const cancelled = order.delivery.status === 'cancelled';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.top}>
          <OrderLogo />
          <View style={styles.flexRow}>
            <Text style={styles.heading}>{language.orderNo}:</Text>
            <Text style={styles.infoBold}>{order.id}</Text>
          </View>
        </View>
        {cancelled && (
          <View style={styles.cancelled}>
            <Text style={styles.cancelledText}>{language.orderCancelled}</Text>
          </View>
        )}
        <PrintOrderHeader
          language={language}
          paidAt={order.payment.paidAt}
          selectedLanguage={selectedLanguage}
          billingAddress={order.billingAddress}
          user={order.user}
          createdAt={order.createdAt}
          cancelled={cancelled}
        />
        <View style={styles.flexGrow}>{children}</View>
        <PrintOrderFooter
          language={language}
          method={order.payment.method}
          cancelled={cancelled}
        />
      </Page>
    </Document>
  );
};

export default PdfContainer;
