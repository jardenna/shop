import apiSlice from '../../app/api/apiSlice';
import {
  AuthRequest,
  AuthResponse,
  LogoutResponse,
  OmittedUserRequest,
} from '../../app/api/apiTypes';
import { authEndpoints } from '../../app/endpoints';
import { TagTypesEnum } from '../../types/types';
import { logout } from './authSlice';

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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(logout());
        dispatch(apiSlice.util.resetApiState());
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(err);
        }
      },
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => ({
        url: authEndpoints.checkAuth,
      }),
      providesTags: [TagTypesEnum.Auth],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
} = authApiSlice;
