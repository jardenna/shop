import { Text, View } from '@react-pdf/renderer';
import PrintContainer from './PrintContainer';
import { styles } from './styles';

interface PrintAdminOrderProps {
  order: string;
}

const PrintAdminOrder = ({ order }: PrintAdminOrderProps) => (
  <PrintContainer>
    <View style={styles.section}>
      <Text style={styles.label}>Customer</Text>
      <Text style={styles.text}>{order}</Text>
    </View>

    <View style={styles.section}>
      <Text style={styles.label}>Order</Text>
    </View>
  </PrintContainer>
);

export default PrintAdminOrder;
