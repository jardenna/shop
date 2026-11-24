import type { SortParams, Status } from './adminApiTypes';
import type { Category, MainCategory } from './categoryApiTypes';
import type { DefaultResponse, Size } from './sharedApiTypes';

export interface CreateSubCategoryRequest {
  category: string;
  categoryStatus: Status;
  subCategoryName: string;
  translationKey: string;
  scheduledDate?: Date;
}

export interface SubCategoryParams extends SortParams {
  categoryName: string;
  categoryStatus: Status;
  subCategoryName: string;
}

export interface BaseSubCategory extends DefaultResponse {
  _id: string;
  allowedSizes: Size[];
  category: MainCategory;
  categoryStatus: Status;
  subCategoryName: string;
  translationKey: string;
}

export interface SubCategoryResponse extends BaseSubCategory {
  categoryName: string;
  id: string;
  mainCategory: MainCategory;
  productCount: number;
  scheduledDate?: Date;
}

export interface GetSubCategoriesResponse extends DefaultResponse {
  subCategories: SubCategoryResponse[];
}

export interface SubCategoriesWithParent {
  allowedSizes: Size[];
  categoryId: string;
  categoryStatus: Status;
  label: string;
  parentCategoryName: string;
  translationKey: string;
}

export interface UpdateSubCategoryResponse extends DefaultResponse {
  category: Category;
  subCategory: SubCategoryResponse;
}

export interface UpdateSubCategoryRequest {
  id: string;
  subCategory: CreateSubCategoryRequest;
}
