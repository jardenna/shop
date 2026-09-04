import { ShopPath } from '../../layout/nav/enums';
import { BreadcrumbsListProps } from './Breadcrumbs';

export const collectionBreadcrumbsList: BreadcrumbsListProps[] = [
  { path: ShopPath.CollectionCategory },
  { path: ShopPath.CollectionCategoryId },
  { path: ShopPath.CollectionSingleProduct },
];

export const saleBreadcrumbsList: BreadcrumbsListProps[] = [
  { path: ShopPath.SaleCategory },
];
