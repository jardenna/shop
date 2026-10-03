import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../styles';

export const footerStyles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    padding: 32,
    borderTopWidth: 1,
    borderTopColor: colors.colorBorder,
    fontSize: 10,
  },
});
