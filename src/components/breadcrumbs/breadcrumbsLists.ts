import { AdminPath, LinkText, ShopPath } from '../../layout/nav/enums';

export type breadcrumbsListProps = {
  path: string;
  label?: string;
};
const breadcrumbsList: breadcrumbsListProps[] = [
  {
    path: ShopPath.Root,
  },
  {
    path: ShopPath.CollectionCategory,
  },
  {
    path: ShopPath.CollectionCategoryId,
  },
];

const adminBreadcrumbsList: breadcrumbsListProps[] = [
  {
    path: ShopPath.Root,
    label: LinkText.Dashboard,
  },
  { path: `${AdminPath.AdminCategoryUpdate}/:id` },
  {
    path: `${AdminPath.AdminSubCategoryUpdate}/:id`,
  },
  {
    path: `${AdminPath.AdminSubCategoryView}/:id`,
  },
  {
    path: `${AdminPath.AdminProductView}/:id`,
  },
  {
    path: `${AdminPath.AdminProductUpdate}/:id`,
  },
];

export { adminBreadcrumbsList, breadcrumbsList };
