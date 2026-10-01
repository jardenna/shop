import { StyleSheet } from '@react-pdf/renderer';
import './pdfFonts';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Outfit',
    fontSize: 12,
  },
  header: {
    padding: 40,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 30,
    textBox: 'trim-both cap alphabetic',
  },
  section: {
    marginBottom: 16,
  },
  table: {
    width: '100%',
    marginTop: 30,
  },

  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottom: 1,
    borderBottomColor: '#000000',
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottom: 1,
    borderBottomColor: '#dddddd',
  },

  description: {
    flex: 1,
  },

  quantity: {
    width: 60,

    textAlign: 'right',
  },

  price: {
    width: 80,

    textAlign: 'right',
  },

  amount: {
    width: 80,

    textAlign: 'right',
  },
});
