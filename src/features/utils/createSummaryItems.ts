import { Discount, Summary } from '../../app/api/apiTypes/sharedApiTypes';
import { vat } from '../../utils/utils';

interface SummaryItemProps {
  label: string;
  price: number;
  cancelled?: boolean;
  className?: string;
  isDiscount?: boolean;
}

interface CreateSummaryItemsProps {
  language: Record<string, string>;
  summary: Summary;
  cancelled?: boolean;
  discount?: Discount;
}

export const createSummaryItems = ({
  summary,
  discount,
  cancelled,
  language,
}: CreateSummaryItemsProps): SummaryItemProps[] => {
  const summaryItems: SummaryItemProps[] = [
    {
      label: language.subtotal,
      price: summary.subTotal,
    },
  ];

  if (summary.discountPrice > 0) {
    summaryItems.push({
      label: language.sale,
      price: summary.discountPrice,
      className: 'summary-discount',
      isDiscount: true,
    });
  }

  if (summary.promoDiscount > 0 && discount) {
    const discountLabel = `${language[discount.label]} (${discount.percent}%)`;

    summaryItems.push({
      label: discountLabel,
      price: summary.promoDiscount,
      isDiscount: true,
    });
  }

  summaryItems.push(
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

  return summaryItems;
};
