import { Discount, Summary } from '../../app/api/apiTypes/sharedApiTypes';
import { vat } from '../../utils/utils';

interface SummaryItemProps {
  label: string;
  price: number;
  cancelled?: boolean;
  className?: string;
  isDiscount?: boolean;
}

interface createSummaryItemListProps {
  language: Record<string, string>;
  summary: Summary;
  cancelled?: boolean;
  discount?: Discount;
}

export const createSummaryItemList = ({
  summary,
  discount,
  cancelled,
  language,
}: createSummaryItemListProps): SummaryItemProps[] => {
  const summaryItemList: SummaryItemProps[] = [
    {
      label: language.subtotal,
      price: summary.subTotal,
    },
  ];

  if (summary.discountPrice > 0) {
    summaryItemList.push({
      label: language.sale,
      price: summary.discountPrice,
      className: 'summary-discount',
      isDiscount: true,
    });
  }

  if (summary.promoDiscount > 0 && discount) {
    const discountLabel = `${language[discount.label]} (${discount.percent}%)`;

    summaryItemList.push({
      label: discountLabel,
      price: summary.promoDiscount,
      isDiscount: true,
    });
  }

  summaryItemList.push(
    {
      label: language.estimatedShipping,
      price: summary.shippingPrice,
    },
    {
      label: `${language.inclVat} (${vat}%)`,
      price: summary.taxPrice,
    },
    {
      label: language.totalPrice,
      price: summary.totalPrice,
      className: 'summary-total',
      cancelled,
    },
  );

  return summaryItemList;
};
