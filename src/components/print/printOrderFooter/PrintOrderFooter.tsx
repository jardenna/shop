import { Text, View } from '@react-pdf/renderer';
import { footerStyles } from './footerStyles';

interface PrintOrderFooterProps {
  language: Record<string, string>;
}

const PrintOrderFooter = ({ language }: PrintOrderFooterProps) => (
  <View style={footerStyles.footer}>
    <View style={footerStyles.column}>
      <Text style={footerStyles.heading}>Fashion Fusion</Text>
      <Text>Street 12</Text>
      <Text>2100 Copenhagen, Denmark</Text>
      <Text>CVR: 12345678</Text>
    </View>

    <View>
      <Text style={footerStyles.heading}>{language.contact}</Text>
      <Text>contact@fashionfusion.com</Text>
      <Text>+45 12 34 56 78</Text>
      <Text>www.fashionfusion.com</Text>
    </View>

    <View>
      <Text style={footerStyles.heading}>{language.payment}</Text>
      <Text>Payment method: Visa</Text>
      <Text>Payment status: Paid</Text>
    </View>
  </View>
);

export default PrintOrderFooter;
