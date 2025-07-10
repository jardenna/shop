import { AdminPath, ShopPath } from '../../layout/nav/enums';

export type breadcrumbsListProps = {
  path: string;
};

const breadcrumbsList: breadcrumbsListProps[] = [
  { path: ShopPath.CollectionCategory },
  { path: ShopPath.CollectionCategoryId },
  { path: ShopPath.CollectionSingleProduct },
];

const adminBreadcrumbsList: breadcrumbsListProps[] = [
  { path: `${AdminPath.AdminCategoryUpdate}/:id` },
  { path: `${AdminPath.AdminSubCategoryUpdate}/:id` },
  { path: `${AdminPath.AdminSubCategoryView}/:id` },
  { path: `${AdminPath.AdminProductView}/:id` },
  { path: `${AdminPath.AdminProductUpdate}/:id` },
];

export { adminBreadcrumbsList, breadcrumbsList };
