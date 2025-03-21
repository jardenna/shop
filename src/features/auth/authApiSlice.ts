import apiSlice from '../../app/api/apiSlice';
import {
  AuthRequest,
  AuthResponse,
  OmittedAuthResponse,
  OmittedUserRequest,
} from '../../app/api/apiTypes';
import { authEndpoints } from '../../app/endpoints';
import { TagTypesEnum } from '../../types/enums';
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
    logout: builder.mutation<OmittedAuthResponse, void>({
      query: () => ({
        url: authEndpoints.logout,
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.error(err);
        }
      },
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => authEndpoints.checkAuth,
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
