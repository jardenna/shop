import { StyleSheet } from '@react-pdf/renderer';
import './pdfFonts';

export const colors = {
  colorBorder: '#e5e5e5',
  ColorborderDark: '#99a4a9',
  colorRed: '#88001b',
  colorBackground: '#f9f9f9',
  colorBackgroundDark: '#1e211d',
  colorTextLight: '#f4f4f5',
};

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Outfit',
    fontSize: 11,
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

  flexGrow: {
    flexGrow: 1,
  },
  infoBold: { fontWeight: 600, letterSpacing: 0.8 },
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

  cancelled: {
    padding: 12,
    backgroundColor: colors.colorRed,
  },

  cancelledText: {
    color: colors.colorTextLight,
    fontWeight: 600,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  lineThrough: {
    textDecoration: 'line-through',
  },
});
