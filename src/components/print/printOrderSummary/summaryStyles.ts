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
    flexDirection: 'column',
    gap: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  value: {
    fontWeight: 500,
  },
  discount: {
    color: '#b82845',
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
    color: '#f4f4f5',
  },
  totalLabel: {
    flex: 1,
    fontWeight: 500,
    textTransform: 'uppercase',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: 600,
    paddingRight: 40,
    textAlign: 'right',
  },
});
