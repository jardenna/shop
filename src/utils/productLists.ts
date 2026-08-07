import { roleValues } from '../app/api/apiConstants';
import type { Size } from '../app/api/apiTypes/sharedApiTypes';
import type { OptionType } from '../types/types';

const sizeList: Size[] = ['S', 'M', 'L', 'XL', 'Onesize'];

const roleList: OptionType[] = roleValues.map((role) => ({
  value: role,
  label: role.toLowerCase(),
}));

const createRatingList = (count: number): OptionType[] =>
  [...Array(count).keys()].map((i) => {
    const value = (i + 1).toString();
    return {
      value,
      label: `rating${value}`,
    };
  });

export { createRatingList, roleList, roleValues, sizeList };
