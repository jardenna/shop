import type { Category } from './adminApiTypes';
import type { BaseProduct, BaseProductParams } from './sharedApiTypes';

export type ShopProductsParams = BaseProductParams & {
  mainCategory?: string;
  subCategoryId?: string;
};

export type ShopProductResponse = BaseProduct & {
  categoryData: Category;
  subCategory: {
    category: string;
    id: string;
    name: string;
  };
};

type ProductMenu = {
  categoryId: string;
  label: string;
};

export type ProductMenuResponse = {
  data: ProductMenu[];
  success: boolean;
};
