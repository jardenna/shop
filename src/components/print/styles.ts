import { StyleSheet } from '@react-pdf/renderer';
import './pdfFonts';
import { colors } from './printOrderFooter/footerStyles';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Outfit',
    fontSize: 10,
  },
  header: {
    backgroundColor: colors.colorBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 20,
    alignItems: 'flex-end',
  },
  infoUppercase: {
    textTransform: 'uppercase',
    fontSize: 9,
    letterSpacing: 1.6,
  },
  flexGrow: {
    flexGrow: 1,
  },
  infoBold: { fontWeight: 600, letterSpacing: 0.8, fontSize: 9 },
  userInfo: { flexDirection: 'column', gap: 1 },
  orderInfo: { flexDirection: 'column', gap: 1 },
  heading: {
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  marginTop6: {
    marginTop: 6,
  },
  alignContentCenter: {
    flexDirection: 'column',
    minHeight: '40%',
    justifyContent: 'center',
  },

  flexRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
});
