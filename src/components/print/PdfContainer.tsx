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
      <View style={styles.header}>
        <OrderLogo />

        <Text style={styles.heading}>Invoice</Text>
      </View>

      <View style={styles.section}>{children}</View>
    </Page>
  </Document>
);

export default PdfContainer;
