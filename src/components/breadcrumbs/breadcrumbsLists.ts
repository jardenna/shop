import { ShopPath } from '../../layout/nav/enums';

export type breadcrumbsListProps = {
  path: string;
};

export const breadcrumbsList: breadcrumbsListProps[] = [
  { path: ShopPath.CollectionCategory },
  { path: ShopPath.CollectionCategoryId },
  { path: ShopPath.CollectionSingleProduct },
];
