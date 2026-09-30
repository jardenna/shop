import { Document, Page, Text, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import OrderLogo from './OrderLogo';
import { styles } from './styles';

interface PdfContainerProps {
  children: ReactNode;
  language: Record<string, string>;
}

const PdfContainer = ({ children, language }: PdfContainerProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <OrderLogo />

        <Text style={styles.heading}>{language.order}</Text>
      </View>

      <View style={styles.section}>{children}</View>
    </Page>
  </Document>
);

export default PdfContainer;
