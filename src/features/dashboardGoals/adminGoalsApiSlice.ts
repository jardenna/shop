import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import {
  AdminGoalsRequest,
  AdminGoalsResponse,
  AdminGoalsTableResponse,
} from '../../app/api/apiTypes/dashboardGoalsApiTypes';
import { adminGoalsUrl } from '../../app/endpoints';

export const adminGoalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardGoals: builder.query<AdminGoalsTableResponse, void>({
      query: () => adminGoalsUrl,
      providesTags: [TagTypesEnum.Goals],
    }),
    updateDashboardGoals: builder.mutation<
      AdminGoalsResponse,
      AdminGoalsRequest
    >({
      query: (body) => ({
        url: adminGoalsUrl,
        method: MethodsEnum.Patch,
        body,
      }),
      invalidatesTags: [TagTypesEnum.Goals],
    }),
  }),
});

export const { useGetDashboardGoalsQuery, useUpdateDashboardGoalsMutation } =
  adminGoalsApiSlice;
