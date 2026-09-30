import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import OrderLogo from './OrderLogo';

interface MyDocumentProps {
  order: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 4,
  },
  text: {
    fontSize: 12,
  },
});

const MyDocument = ({ order }: MyDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <OrderLogo />

      <View style={styles.section}>
        <Text style={styles.label}>Customer</Text>
        <Text style={styles.text}>{order}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Order</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
