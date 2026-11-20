import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './baseQueryWithErrorHandling';

export const TagTypesEnum = {
  Account: 'Account',
  Address: 'Address',
  Auth: 'Auth',
  Carts: 'Carts',
  Categories: 'Categories',
  Checkout: 'Checkout',
  Favorites: 'Favorites',
  Goals: 'Goals',
  Order: 'Order',
  Products: 'Products',
  PromoCode: 'PromoCode',
  Reviews: 'reviews',
  SubCategories: 'SubCategories',
  Users: 'Users',
} as const;

export type TagTypesEnumValue =
  (typeof TagTypesEnum)[keyof typeof TagTypesEnum];

export const MethodsEnum = {
  Delete: 'DELETE',
  Get: 'GET',
  Patch: 'PATCH',
  Post: 'POST',
  Put: 'PUT',
} as const;

export type MethodsEnumValue = (typeof MethodsEnum)[keyof typeof MethodsEnum];
const apiSlice = createApi({
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: [
    TagTypesEnum.Account,
    TagTypesEnum.Address,
    TagTypesEnum.Auth,
    TagTypesEnum.Carts,
    TagTypesEnum.Categories,
    TagTypesEnum.Checkout,
    TagTypesEnum.Favorites,
    TagTypesEnum.Goals,
    TagTypesEnum.Order,
    TagTypesEnum.Products,
    TagTypesEnum.PromoCode,
    TagTypesEnum.Reviews,
    TagTypesEnum.SubCategories,
    TagTypesEnum.Users,
  ],
  endpoints: () => ({}),
});

export default apiSlice;
