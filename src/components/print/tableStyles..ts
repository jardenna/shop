import { StyleSheet } from '@react-pdf/renderer';
import './pdfFonts';

export const tableStyles = StyleSheet.create({
  table: {
    width: '100%',
  },

  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottom: 1,
    borderBottomColor: '#99a4a9',
    borderBottomWidth: 1,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottom: 1,
    borderBottomColor: '#e5e5e5',
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
