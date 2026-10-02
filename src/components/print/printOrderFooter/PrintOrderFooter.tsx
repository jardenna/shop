import { Text, View } from '@react-pdf/renderer';
import { paymentMethodLabels } from '../../../app/api/apiConstants';
import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import {
  contactInformationList,
  shopInformationList,
  shopName,
} from '../../../utils/contactInformation';
import { footerStyles } from './footerStyles';

interface PrintOrderFooterProps {
  language: Record<string, string>;
  method: PaymentMethods;
}

const PrintOrderFooter = ({ language, method }: PrintOrderFooterProps) => (
  <View style={footerStyles.footer}>
    <View style={footerStyles.column}>
      <Text style={footerStyles.heading}>{shopName}</Text>
      {shopInformationList.map((shopInfo) => (
        <Text key={shopInfo}>{shopInfo}</Text>
      ))}
    </View>

    <View>
      <Text style={footerStyles.heading}>{language.contact}</Text>
      {contactInformationList.map((contact) => (
        <Text key={contact}>{contact}</Text>
      ))}
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
