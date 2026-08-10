import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './baseQueryWithErrorHandling';

export enum TagTypesEnum {
  Address = 'Address',
  Auth = 'Auth',
  Carts = 'Carts',
  Categories = 'Categories',
  Checkout = 'Checkout',
  Favorites = 'Favorites',
  Order = 'Order',
  Products = 'Products',
  Profile = 'Profile',
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
    TagTypesEnum.Profile,
    TagTypesEnum.Carts,
    TagTypesEnum.Order,
    TagTypesEnum.Checkout,
    TagTypesEnum.Address,
  ],
  endpoints: () => ({}),
});

export default apiSlice;
