import { Text, View } from '@react-pdf/renderer';
import { BaseAddress } from '../../app/api/apiTypes/addressApiTypes';
import { User } from '../../app/api/apiTypes/orderApiTypes';
import { SelectedLanguage } from '../../features/language/languageSlice';
import { formatDate } from './formatdate';
import { styles } from './styles';

interface PrintOrderHeaderProps {
  billingAddress: BaseAddress;
  cancelled: boolean;
  createdAt: Date;
  language: Record<string, string>;
  paidAt: Date;
  selectedLanguage: SelectedLanguage;
  user: User;
}

const PrintOrderHeader = ({
  paidAt,
  billingAddress,
  user,
  createdAt,
  language,
  cancelled,
  selectedLanguage,
}: PrintOrderHeaderProps) => (
  <View style={styles.header}>
    <View style={styles.userInfo}>
      <Text style={styles.heading}>{billingAddress.name}</Text>
      <Text>{billingAddress.street}</Text>
      <Text>
        {billingAddress.zipCode} {billingAddress.city} {billingAddress.country}
      </Text>
      <Text style={styles.marginTop6}>
        {language.email}: {user.email}
      </Text>
      <Text>
        {language.phone}: {user.phoneNo}
      </Text>
    </View>

    <View style={styles.orderInfo}>
      <View>
        <Text style={styles.heading}>{language.orderDate}:</Text>
        <Text style={styles.infoBold}>
          {formatDate(createdAt, selectedLanguage)}
        </Text>
      </View>
      <View style={styles.marginTop6}>
        {cancelled ? (
          <Text>{language.cancelled}</Text>
        ) : (
          <View>
            <Text style={styles.heading}>{language.paid}:</Text>
            <Text style={styles.infoBold}>
              {formatDate(paidAt, selectedLanguage)}
            </Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

export default PrintOrderHeader;
