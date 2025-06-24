import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import type {
  AuthRequest,
  AuthResponse,
  OmittedUserRequest,
} from '../../app/api/apiTypes/adminApiTypes';
import { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { authEndpoints } from '../../app/endpoints';
import { store } from '../../app/store';
import { logout } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, AuthRequest>({
      query: (user) => {
        const isAdmin = store.getState().auth.user?.user.isAdmin;
        return {
          url: isAdmin ? authEndpoints.create : authEndpoints.register,
          method: 'POST',
          body: user,
        };
      },
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
    logout: builder.mutation<DefaultResponse, void>({
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
