import type { Size } from '../app/api/apiTypes/sharedApiTypes';

const clothingSizes: Size[] = ['S', 'M', 'L', 'XL'];
export const oneSize = 'Onesize';

export function sortSizesDynamic(sizes: Size[]) {
  const numericSizes = sizes
    .filter((s) => /^\d+$/.test(s))
    .sort((a, b) => Number(a) - Number(b));
  const letterSizes = sizes
    .filter((s) => /^[SMLX]+$/.test(s))
    .sort((a, b) => clothingSizes.indexOf(a) - clothingSizes.indexOf(b));
  const otherSizes = sizes.filter(
    (s) => !numericSizes.includes(s) && !letterSizes.includes(s),
  );

  return [...numericSizes, ...letterSizes, ...otherSizes];
}
