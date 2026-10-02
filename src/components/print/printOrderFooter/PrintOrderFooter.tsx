import { Text, View } from '@react-pdf/renderer';
import { footerStyles } from './footerStyles';

interface PrintOrderFooterProps {
  language: Record<string, string>;
}

const PrintOrderFooter = ({ language }: PrintOrderFooterProps) => (
  <View style={footerStyles.footer}>
    <View style={footerStyles.column}>
      <Text style={footerStyles.heading}>SHOP NAME</Text>
      <Text style={footerStyles.text}>Street 12</Text>
      <Text style={footerStyles.text}>2100 Copenhagen</Text>
      <Text style={footerStyles.text}>Denmark</Text>
      <Text style={footerStyles.text}>CVR: 12345678</Text>
    </View>

    <View style={footerStyles.column}>
      <Text style={footerStyles.heading}>{language.contact}</Text>
      <Text style={footerStyles.text}>hello@example.com</Text>
      <Text style={footerStyles.text}>+45 12 34 56 78</Text>
      <Text style={footerStyles.text}>www.example.com</Text>
    </View>

    <View style={footerStyles.column}>
      <Text style={footerStyles.heading}>{language.payment}</Text>
      <Text style={footerStyles.text}>Payment method: Visa</Text>
      <Text style={footerStyles.text}>Payment status: Paid</Text>
    </View>
  </View>
);

export default PrintOrderFooter;
