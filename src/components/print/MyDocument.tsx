import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

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
  logo: {
    width: 120,
    height: 'auto',
    marginBottom: 30,
  },
});

const MyDocument = ({ order }: MyDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src="/images/logo.svg" style={styles.logo} />
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
