type Params = {
  language: Record<string, string>;
  page: number;
  productCount: number;
  productsPerPage: number;
  totalBtns: number;
};

const getRangeText = (page: number, perPage: number, total: number) => {
  // Handle zero products early to avoid weird "1–0 of 0" cases
  if (total === 0) {
    return { start: 0, end: 0 };
  }

  const showingAll = perPage >= total && total > 0;
  let start: number;
  let end: number;

  if (showingAll) {
    start = 1;
    end = total;
  } else {
    start = (page - 1) * perPage + 1;
    end = Math.min(page * perPage, total);
  }

  return { start, end };
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

  // 'Side 3 af 4' = paginationMobileText
  const mobile = `${language.page} ${page} ${language.of} ${totalBtns}`;

  //  Side 3 af 4 indlæst. Viser 17–24 af 32 produkter.
  const ariaLiveText = `${mobile} ${language.loaded}. ${infoText}`;

  return { infoText, paginationMobileText: mobile, ariaLiveText };
};

export default usePaginationText;
