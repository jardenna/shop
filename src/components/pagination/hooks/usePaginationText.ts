import { getRangeText } from '../utils';

type Params = {
  itemCount: number;
  itemsPerPage: number;
  language: Record<string, string>;
  page: number;
  totalBtns: number;
};

export const usePaginationText = ({
  page,
  itemsPerPage,
  itemCount,
  totalBtns,
  language,
}: Params) => {
  const { start, end } = getRangeText(page, itemsPerPage, itemCount);

  // Viser 17–24 af 32 produkter.
  const infoText = `${language.showing} ${start}–${end} ${language.of} ${itemCount} ${language.products.toLowerCase()}.`;

  // Side 3 af 4
  const mobile = `${language.page} ${page} ${language.of} ${totalBtns}`;

  //  Side 3 af 4 indlæst. Viser 17–24 af 32 produkter.
  const ariaLiveText = `${mobile} ${language.loaded}. ${infoText}`;

  return { infoText, paginationMobileText: mobile, ariaLiveText };
};
