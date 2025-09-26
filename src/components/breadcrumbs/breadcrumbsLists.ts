import { ShopPath } from '../../layout/nav/enums';

export type breadcrumbsListProps = {
  path: string;
};

const breadcrumbsList: breadcrumbsListProps[] = [
  { path: ShopPath.CollectionCategory },
  { path: ShopPath.CollectionCategoryId },
  { path: ShopPath.CollectionSingleProduct },
];

export { breadcrumbsList };
