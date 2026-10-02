import { StyleSheet } from '@react-pdf/renderer';
import './pdfFonts';

const contentPadding = '30 20';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Outfit',
    fontSize: 12,
  },
  flexRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  top: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 20,
    alignItems: 'flex-end',
  },
  infoUppercase: {
    textTransform: 'uppercase',
    fontSize: 9,
    letterSpacing: 1.6,
  },
  infoBold: { fontWeight: 600, letterSpacing: 0.8, fontSize: 9 },
  content: {
    padding: contentPadding,
  },
  header: {
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  userInfo: { lineHeight: 2 },
  orderInfo: { flexDirection: 'column' },
  heading: {
    fontSize: 30,
    textBox: 'trim-both cap alphabetic',
  },

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
