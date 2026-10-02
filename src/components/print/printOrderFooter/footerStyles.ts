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
    fontSize: 8,
  },
  column: {
    flexDirection: 'column',
    gap: 1.4,
  },

  heading: {
    marginBottom: 1,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
});
