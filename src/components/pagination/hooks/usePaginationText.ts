import getRangeText from '../utils';

type Params = {
  language: Record<string, string>;
  page: number;
  productCount: number;
  productsPerPage: number;
  totalBtns: number;
};

const usePaginationText = ({
  page,
  productsPerPage,
  productCount,
  totalBtns,
  language,
}: Params) => {
  const { start, end } = getRangeText(page, productsPerPage, productCount);

  // Viser 17–24 af 32 produkter.
  const infoText = `${language.showing} ${start}–${end} ${language.of} ${productCount} ${language.products.toLowerCase()}.`;

  // Side 3 af 4
  const mobile = `${language.page} ${page} ${language.of} ${totalBtns}`;

  //  Side 3 af 4 indlæst. Viser 17–24 af 32 produkter.
  const ariaLiveText = `${mobile} ${language.loaded}. ${infoText}`;

  return { infoText, paginationMobileText: mobile, ariaLiveText };
};

export default usePaginationText;
