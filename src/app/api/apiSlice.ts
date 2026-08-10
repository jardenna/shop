import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

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

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers) => {
    const lang = localStorage.getItem('lang') || 'da'; // Get language from storage
    headers.set('x-language', lang);
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 'PARSING_ERROR') {
    const fetchError: FetchBaseQueryError = {
      status: 'FETCH_ERROR',
      error: 'Request failed',
    };

    return {
      error: fetchError,
    };
  }

  return result;
};

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
