import { SortParams, Status } from './adminApiTypesNew';
import { Category, MainCategory } from './categoryApiTypes';
import { DefaultResponseType } from './sharedApiTypes';

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

export interface BaseSubCategory extends DefaultResponseType {
  _id: string;
  allowedSizes: string[];
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

export interface SubCategoriesResponse extends DefaultResponseType {
  subCategories: SubCategoryResponse[];
}

export interface SubCategoriesWithParent {
  allowedSizes: string[];
  categoryId: string;
  categoryStatus: Status;
  label: string;
  parentCategoryName: string;
}

export interface UpdateSubCategoryResponse {
  category: Category;
  subCategory: SubCategoryResponse;
}

export interface UpdateSubCategoryRequest {
  id: string;
  subCategory: CreateSubCategoryRequest;
}
