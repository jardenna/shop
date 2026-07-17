import { Discount, Summary } from '../../app/api/apiTypes/sharedApiTypes';
import { vat } from '../../utils/utils';

type SummaryItem = {
  label: string;
  price: number;
  className?: string;
  isDiscount?: boolean;
};

type CreateSummaryItemsProps = {
  language: Record<string, string>;
  summary: Summary;
  discount?: Discount;
};

export const createSummaryItems = ({
  summary,
  discount,
  language,
}: CreateSummaryItemsProps): SummaryItem[] => {
  const summaryItems: SummaryItem[] = [
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

    summaryItems.push({
      label: language.estimatedShipping,
      price: summary.shippingPrice,
    });
  }

  summaryItems.push(
    {
      label: `${language.inclVat} (${vat}%)`,
      price: summary.taxPrice,
    },
    {
      label: language.totalPrice,
      price: summary.totalPrice,
      className: 'summary-total',
    },
  );

  return summaryItems;
};
