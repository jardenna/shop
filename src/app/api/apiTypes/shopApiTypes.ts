import type { BaseProduct, BaseProductParams } from './sharedApiTypes';

export type ShopProductsParams = BaseProductParams & {
  mainCategory?: string;
  subCategoryId?: string;
};

export type ShopProductResponse = {
  page: number;
  pages: number;
  productCount: number;
  products: BaseProduct[];
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
