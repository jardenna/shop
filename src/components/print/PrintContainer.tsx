import { Document, Page, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import OrderLogo from './OrderLogo';
import { styles } from './styles';

interface PrintContainerProps {
  children: ReactNode;
}

const PrintContainer = ({ children }: PrintContainerProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <OrderLogo />
      <View style={styles.section}>{children}</View>
    </Page>
  </Document>
);

export default PrintContainer;
