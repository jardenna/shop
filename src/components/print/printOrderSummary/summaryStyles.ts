import { StyleSheet } from '@react-pdf/renderer';

export const summaryStyles = StyleSheet.create({
  summary: {
    marginTop: 18,
    alignItems: 'flex-end',
    paddingRight: 20,
  },

  summaryRow: {
    flexDirection: 'row',
    width: '34%',
    paddingVertical: 5,
  },

  label: {
    flex: 1,
  },

  value: {
    width: 90,
    fontWeight: 500,
    textAlign: 'right',
  },

  totalRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1e211d',
    alignItems: 'center',
  },

  totalLabel: {
    flex: 1,

    fontWeight: 500,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: 600,
    color: '#FFFFFF',
    textAlign: 'right',
  },
});
