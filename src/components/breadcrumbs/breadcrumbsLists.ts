import { AdminPath, LinkText, ShopPath } from '../../layout/nav/enums';

export type breadcrumbsListProps = {
  path: string;
  label?: string;
};
const breadcrumbsList: breadcrumbsListProps[] = [
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
  {
    path: AdminPath.AdminUserCreate,
    label: LinkText.CreateNewUser,
  },
  {
    path: AdminPath.AdminCategoryCreate,
    label: LinkText.CreateNewCategory,
  },
  {
    path: AdminPath.AdminSubCategoryCreate,
    label: LinkText.CreateNewCategory,
  },
  {
    path: `${AdminPath.AdminCategoryUpdate}/:id`,
    label: '',
  },
  {
    path: `${AdminPath.AdminSubCategoryUpdate}/:id`,
    label: '',
  },
  {
    path: AdminPath.AdminSubCategories,
    label: LinkText.Categories,
  },
  {
    path: `${AdminPath.AdminSubCategoryView}/:id`,
    label: '',
  },
  {
    path: `${AdminPath.AdminProductView}/:id`,
    label: '',
  },
  {
    path: AdminPath.AdminProductCreate,
    label: LinkText.CreateNewProduct,
  },
  {
    path: `${AdminPath.AdminProductUpdate}/:id`,
    label: '',
  },
];

export { adminBreadcrumbsList, breadcrumbsList };
