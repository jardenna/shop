import apiSlice from '../../app/api/apiSlice';
import {
  AuthRequest,
  AuthResponse,
  LogoutResponse,
  OmittedUserRequest,
} from '../../app/api/apiTypes';
import { authEndpoints } from '../../app/endpoints';
import { TagTypesEnum } from '../../types/types';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, AuthRequest>({
      query: (user) => ({
        url: authEndpoints.register,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    login: builder.mutation<AuthResponse, OmittedUserRequest>({
      query: (user) => ({
        url: authEndpoints.login,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: authEndpoints.logout,
        method: 'POST',
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => ({
        url: authEndpoints.checkAuth,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
} = authApiSlice;
