import { Document, Page, Text, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import OrderLogo from './OrderLogo';
import { styles } from './styles';

interface PdfContainerProps {
  children: ReactNode;
}

const PdfContainer = ({ children }: PdfContainerProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <OrderLogo />
      <Text style={styles.title}>Invoice</Text>
      <View style={styles.section}>{children}</View>
    </Page>
  </Document>
);

export default PdfContainer;
