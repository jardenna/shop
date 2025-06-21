import type { Category } from './adminApiTypes';
import type {
  BaseProduct,
  BaseProductParams,
  BaseSubCategory,
} from './sharedApiTypes';

export type ShopProductsParams = BaseProductParams & {
  mainCategory?: string;
  subCategoryId?: string;
};

export type ShopProduct = BaseProduct & {
  categoryData: Category;
  subCategory: string;
  subCategoryData: BaseSubCategory;
};

export type ShopProductResponse = BaseProduct & {
  page: number;
  pages: number;
  productCount: number;
  products: ShopProduct[];
  success: boolean;
};

type ProductMenu = {
  categoryId: string;
  label: string;
};

export type ProductMenuResponse = {
  data: ProductMenu[];
  success: boolean;
};
