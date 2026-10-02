import { StyleSheet } from '@react-pdf/renderer';

export const summaryStyles = StyleSheet.create({
  summary: {
    marginTop: 24,
    alignItems: 'flex-end',
  },

  summaryRow: {
    flexDirection: 'row',
    width: '45%',
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
    width: '100%',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#292929',
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
