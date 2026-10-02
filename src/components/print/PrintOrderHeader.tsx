import { Text, View } from '@react-pdf/renderer';
import { SelectedLanguage } from '../../features/language/languageSlice';
import { formatDate } from './formatdate';
import { styles } from './styles';

interface PrintOrderHeaderProps {
  language: Record<string, string>;
  paidAt: Date;
  selectedLanguage: SelectedLanguage;
}

const PrintOrderHeader = ({
  paidAt,
  language,
  selectedLanguage,
}: PrintOrderHeaderProps) => (
  <View style={styles.header}>
    <Text>{language.paid}</Text>

    <Text>{formatDate(paidAt, selectedLanguage)}</Text>
  </View>
);

export default PrintOrderHeader;
