import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './baseQueryWithErrorHandling';

export enum TagTypesEnum {
  Account = 'Account',
  Address = 'Address',
  Auth = 'Auth',
  Carts = 'Carts',
  Categories = 'Categories',
  Checkout = 'Checkout',
  Favorites = 'Favorites',
  Order = 'Order',
  Products = 'Products',
  SubCategories = 'SubCategories',
  Users = 'Users',
}

const apiSlice = createApi({
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: [
    TagTypesEnum.Users,
    TagTypesEnum.Auth,
    TagTypesEnum.Categories,
    TagTypesEnum.SubCategories,
    TagTypesEnum.Products,
    TagTypesEnum.Favorites,
    TagTypesEnum.Account,
    TagTypesEnum.Carts,
    TagTypesEnum.Order,
    TagTypesEnum.Checkout,
    TagTypesEnum.Address,
  ],
  endpoints: () => ({}),
});

export default apiSlice;
