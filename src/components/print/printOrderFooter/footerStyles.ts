import { StyleSheet } from '@react-pdf/renderer';

export const colors = {
  colorBorder: '#e5e5e5',
  ColorborderDark: '#99a4a9',
  textDangerColor: '#b82845',
  colorBackground: '#f9f9f9',
  colorBackgroundDark: '#1e211d',
  colorTextLight: '#f4f4f5',
};

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
