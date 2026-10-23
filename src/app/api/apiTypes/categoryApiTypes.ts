import { SortParams, Status } from './adminApiTypesNew';
import { DefaultResponse, DefaultResponseType } from './sharedApiTypes';

export interface Category extends DefaultResponseType {
  categoryName: string;
  categoryStatus: Status;
  id: string;
  scheduledDate?: Date;
}

export interface CategoriesResponse extends DefaultResponse {
  categories: Category[];
}

export interface CategoryItemResponse extends DefaultResponseType {
  category: Category;
}

export interface CategoryParams extends SortParams {
  categoryName: string;
  categoryStatus: Status;
  createdAt: string;
}

export type UpdateCategoryRequest = {
  category: CreateCategoryRequest;
  id: string;
};

export interface MainCategory extends DefaultResponseType {
  _id: string;
  categoryName: string;
  categoryStatus: Status;
  id: string;
  scheduledDate?: Date;
}

export type CreateCategoryRequest = {
  categoryName: string;
  categoryStatus: Status;
  scheduledDate?: Date;
};
