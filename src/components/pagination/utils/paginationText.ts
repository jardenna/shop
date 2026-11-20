import type { Language } from '../../../types/types';
import { getRangeText } from './utils';

interface PaginationTextParams {
  itemCount: number;
  itemsPerPage: number;
  language: Language;
  page: number;
  totalBtns: number;
}

export const paginationText = ({
  page,
  itemsPerPage,
  itemCount,
  totalBtns,
  language,
}: PaginationTextParams) => {
  const { start, end } = getRangeText(page, itemsPerPage, itemCount);

  // Viser 17–24 af 32 produkter.
  const infoText = `${language.showing} ${start}–${end} ${language.of} ${itemCount} ${language.products.toLowerCase()}.`;

  // Side 3 af 4
  const mobile = `${language.page} ${page} ${language.of} ${totalBtns}`;

  //  Side 3 af 4 indlæst. Viser 17–24 af 32 produkter.
  const ariaLiveText = `${mobile} ${language.loaded}. ${infoText}`;

  return { infoText, paginationMobileText: mobile, ariaLiveText };
};
