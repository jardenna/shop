import { StyleSheet } from '@react-pdf/renderer';

export const footerStyles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
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
