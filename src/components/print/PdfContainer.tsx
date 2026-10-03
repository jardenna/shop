import { Document, Page, Text, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { SelectedLanguage } from '../../features/language/languageSlice';
import OrderLogo from './OrderLogo';
import PrintOrderFooter from './printOrderFooter/PrintOrderFooter';
import PrintOrderHeader from './PrintOrderHeader';
import { styles } from './styles';

interface PdfContainerProps {
  children: ReactNode;
  language: Record<string, string>;
  order: OrderResponse;
  selectedLanguage: SelectedLanguage;
}

const PdfContainer = ({
  children,
  language,
  order,
  selectedLanguage,
}: PdfContainerProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.top}>
        <OrderLogo />
        <View style={styles.flexRow}>
          <Text style={styles.heading}>{language.orderNo}:</Text>
          <Text style={styles.infoBold}>{order.id}</Text>
        </View>
      </View>
      {order.delivery.status === 'cancelled' && (
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
      />
      <View style={styles.flexGrow}>{children}</View>
      <PrintOrderFooter language={language} method={order.payment.method} />
    </Page>
  </Document>
);

export default PdfContainer;
