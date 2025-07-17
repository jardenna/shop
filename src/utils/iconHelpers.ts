import { IconName } from '../types/enums';

export const categoryToIconName: Record<string, IconName> = {
  Women: IconName.Woman,
  Men: IconName.Man,
  Kids: IconName.Kid,
};

export const resolveIconName = (category: string): IconName =>
  categoryToIconName[category] ?? IconName.Woman;
