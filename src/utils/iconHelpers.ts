import { IconName } from '../types/enums';

const categoryToIconName: Record<string, IconName> = {
  Women: IconName.Woman,
  Men: IconName.Man,
  Kids: IconName.Kid,
};

const resolveIconName = (category: string): IconName =>
  categoryToIconName[category] ?? IconName.Woman;

export { categoryToIconName, resolveIconName };
