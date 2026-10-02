import { Document, Page, Text, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import { SelectedLanguage } from '../../features/language/languageSlice';
import OrderLogo from './OrderLogo';
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
          <Text style={styles.infoUppercase}>{language.orderNo}:</Text>
          <Text style={styles.infoBold}>{order.id}</Text>
        </View>
      </View>

      <PrintOrderHeader
        language={language}
        paidAt={order.payment.paidAt}
        selectedLanguage={selectedLanguage}
        billingAddress={order.billingAddress}
        user={order.user}
      />
      {children}
    </Page>
  </Document>
);

export default PdfContainer;
