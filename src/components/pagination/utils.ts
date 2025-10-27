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

export default getRangeText;
