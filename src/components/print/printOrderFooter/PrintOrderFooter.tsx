import { Text, View } from '@react-pdf/renderer';
import { paymentMethodLabels } from '../../../app/api/apiConstants';
import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import { footerStyles } from './footerStyles';

interface PrintOrderFooterProps {
  language: Record<string, string>;
  method: PaymentMethods;
}

const PrintOrderFooter = ({ language, method }: PrintOrderFooterProps) => (
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
      <Text>
        {language.paymentMethod}: {paymentMethodLabels[method]}
      </Text>
      <Text>
        {language.paymentStatus}: {language.paid}
      </Text>
    </View>
  </View>
);

export default PrintOrderFooter;
