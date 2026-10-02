import { StyleSheet } from '@react-pdf/renderer';
import '../pdfFonts';
import { colors } from '../styles';

export const tableStyles = StyleSheet.create({
  table: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottom: 1,
    borderBottomColor: colors.ColorborderDark,
    borderBottomWidth: 1,
    fontWeight: 500,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottom: 1,
    borderBottomColor: colors.colorBorder,
    borderBottomWidth: 1,
  },

  description: {
    flex: 1,
  },

  quantity: {
    width: 60,
  },

  price: {
    width: 80,
  },

  amount: {
    width: 80,
  },
});
