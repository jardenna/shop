import { StyleSheet } from '@react-pdf/renderer';
import { colors } from '../printOrderFooter/footerStyles';

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
    color: colors.textDangerColor,
  },
  totalRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingRight: 60,
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.colorBackgroundDark,
    alignItems: 'center',
    width: summaryTableWidth,
    color: colors.colorTextLight,
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
