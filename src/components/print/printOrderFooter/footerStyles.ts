import { StyleSheet } from '@react-pdf/renderer';

export const footerStyles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    marginTop: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
  },

  column: {
    flex: 1,
  },

  heading: {
    marginBottom: 6,
    fontSize: 8,
    fontWeight: 600,
    textTransform: 'uppercase',
  },

  text: {
    marginBottom: 3,
    fontSize: 8,
  },
});
