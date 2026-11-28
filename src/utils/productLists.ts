import { roleValues } from '../app/api/apiConstants';
import type { Size } from '../app/api/apiTypes/sharedApiTypes';
import type { OptionWithId } from '../shared/types';
import { oneSize } from './sizeUtils';

const sizeList: Size[] = ['S', 'M', 'L', 'XL', oneSize];

const roleList: OptionWithId[] = roleValues.map((role) => ({
  value: role,
  label: role.toLowerCase(),
  id: role,
}));

const createRatingList = (count: number): OptionWithId[] =>
  [...Array(count).keys()].map((i) => {
    const value = (i + 1).toString();
    return {
      value,
      label: `rating${value}`,
      id: value,
    };
  });

export { createRatingList, roleList, roleValues, sizeList };
