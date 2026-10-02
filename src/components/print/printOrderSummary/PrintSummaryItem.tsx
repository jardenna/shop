import { Text, View } from '@react-pdf/renderer';
import { summaryStyles } from './summaryStyles';

interface PrintSummaryItemProps {
  label: string;
  value: string;
  isDiscount?: boolean;
}

const PrintSummaryItem = ({
  label,
  value,
  isDiscount,
}: PrintSummaryItemProps) => (
  <View
    style={[
      summaryStyles.summaryRow,
      isDiscount ? summaryStyles.discount : undefined,
    ]}
  >
    <Text style={summaryStyles.label}>{label}</Text>
    <Text style={summaryStyles.value}>{isDiscount ? `- ${value}` : value}</Text>
  </View>
);

export default PrintSummaryItem;
