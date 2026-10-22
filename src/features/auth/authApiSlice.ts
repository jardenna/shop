import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import type {
  AuthRequest,
  AuthResponse,
  OmittedUserRequest,
} from '../../app/api/apiTypes/adminApiTypes';
import type { DefaultResponse } from '../../app/api/apiTypes/sharedApiTypes';
import { authEndpoints } from '../../app/endpoints';
import { logout } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, AuthRequest>({
      query: (user) => ({
        url: authEndpoints.register,
        method: MethodsEnum.Post,
        body: user,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    createUser: builder.mutation<AuthResponse, AuthRequest>({
      query: (user) => ({
        url: authEndpoints.create,
        method: MethodsEnum.Post,
        body: user,
      }),
      invalidatesTags: [TagTypesEnum.Auth],
    }),
    login: builder.mutation<AuthResponse, OmittedUserRequest>({
      query: (user) => ({
        url: authEndpoints.login,
        method: MethodsEnum.Post,
        body: user,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          authApiSlice.util.updateQueryData('checkAuth', undefined, () => data),
        );
      },
    }),
    logout: builder.mutation<DefaultResponse, void>({
      query: () => ({
        url: authEndpoints.logout,
        method: MethodsEnum.Post,
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
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useCreateUserMutation,
} = authApiSlice;
