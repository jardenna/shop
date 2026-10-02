import { StyleSheet } from '@react-pdf/renderer';

const summaryTableWidth = '40%';

export const summaryStyles = StyleSheet.create({
  summary: {
    marginTop: 18,
    alignItems: 'flex-end',
  },
  summaryTable: {
    paddingRight: 60,
    width: summaryTableWidth,
  },
  summaryRow: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  label: {
    flex: 1,
  },
  value: {
    width: 90,
    fontWeight: 500,
    textAlign: 'right',
  },
  discount: {
    color: 'red',
  },
  totalRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingRight: 60,
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1e211d',
    alignItems: 'center',
    width: summaryTableWidth,
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
    paddingRight: 40,
    color: '#FFFFFF',
    textAlign: 'right',
  },
});
