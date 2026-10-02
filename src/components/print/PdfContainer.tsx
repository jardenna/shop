import { Document, Page, Text, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import { OrderResponse } from '../../app/api/apiTypes/orderApiTypes';
import OrderLogo from './OrderLogo';
import { styles } from './styles';

interface PdfContainerProps {
  children: ReactNode;
  language: Record<string, string>;
  order: OrderResponse;
}

const PdfContainer = ({ children, language, order }: PdfContainerProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.top}>
        <OrderLogo />
        <View style={styles.flexRow}>
          <Text style={styles.infoUppercase}>{language.orderNo}:</Text>
          <Text style={styles.infoBold}>{order.id}</Text>
        </View>
      </View>

      <View style={styles.header}>
        <Text>{language.order}</Text>
      </View>

      {children}
    </Page>
  </Document>
);

export default PdfContainer;
