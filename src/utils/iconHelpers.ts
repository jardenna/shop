import { IconName } from '../components/icons/iconConstants';
import type { IconNameValue } from '../shared/types';

const categoryToIconName: Record<string, IconNameValue> = {
  Women: IconName.Woman,
  Men: IconName.Man,
  Kids: IconName.Kid,
};

export const resolveIconName = (category: string): IconNameValue =>
  categoryToIconName[category] ?? IconName.Woman;
