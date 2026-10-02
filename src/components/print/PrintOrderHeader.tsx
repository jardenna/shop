import { Text, View } from '@react-pdf/renderer';
import { BaseAddress } from '../../app/api/apiTypes/addressApiTypes';
import { User } from '../../app/api/apiTypes/orderApiTypes';
import { SelectedLanguage } from '../../features/language/languageSlice';
import { formatDate } from './formatdate';
import { styles } from './styles';

interface PrintOrderHeaderProps {
  billingAddress: BaseAddress;
  language: Record<string, string>;
  paidAt: Date;
  selectedLanguage: SelectedLanguage;
  user: User;
}

const PrintOrderHeader = ({
  paidAt,
  billingAddress,
  user,
  language,
  selectedLanguage,
}: PrintOrderHeaderProps) => (
  <View style={styles.header}>
    <View style={styles.userInfo}>
      <Text style={styles.infoUppercase}>Invoise to:</Text>
      <Text>{billingAddress.name}</Text>
      <Text style={styles.text}>{billingAddress.street}</Text>
      <Text style={styles.text}>
        {billingAddress.zipCode} {billingAddress.city} {billingAddress.country}
      </Text>

      <Text style={styles.text}>
        {language.email}: {user.email}
      </Text>
      <Text style={styles.text}>
        {language.phone}: {user.phoneNo === '' ? ' not oplyst' : user.phoneNo}
      </Text>
    </View>

    <View style={styles.orderInfo}>
      <Text>{language.paid}</Text>
      <Text>{formatDate(paidAt, selectedLanguage)}</Text>
    </View>
  </View>
);

export default PrintOrderHeader;
