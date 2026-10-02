import { StyleSheet } from '@react-pdf/renderer';
import './pdfFonts';

const contentPadding = '30 20';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Outfit',
    fontSize: 11,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  userInfo: { flexDirection: 'column', gap: 1 },
  orderInfo: { flexDirection: 'column', gap: 1 },
  heading: {
    fontSize: 30,
    textBox: 'trim-both cap alphabetic',
  },
});
