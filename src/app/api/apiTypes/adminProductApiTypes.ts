import { SortParams, Status } from './adminOrderApiTypes';
import { Category } from './categoryApiTypes';
import { BasePagination, BaseShopProduct, Size } from './sharedApiTypes';
import { BaseSubCategory } from './subCategoryApiTypes';

export interface Product extends BaseShopProduct {
  category: Category;
  quantity: number;
  subCategory: BaseSubCategory;
  scheduledDate?: Date;
}

export interface ProductsParams extends SortParams {
  categoryName: string;
  maxDiscount: string;
  maxPrice: string;
  maxStock: string;
  minDiscount: string;
  minPrice: string;
  minStock: string;
  productName: string;
  productStatus: Status;
  subCategoryName: string;
  maxDiscountedPrice?: string;
  minDiscountedPrice?: string;
  page?: string;
  productsPerPage?: number;
}

export interface ProductRequest {
  brand: string;
  colors: string[];
  description: string;
  discount: number;
  images: string[];
  material: string;
  price: number;
  productName: string;
  productStatus: Status;
  quantity: number;
  sizes: Size[];
  subCategory: string;
  scheduledDate?: Date;
}

export interface UpdateProductRequest {
  id: string;
  product: ProductRequest;
}

export interface ProductsResponse extends BasePagination {
  products: Product[];
}
