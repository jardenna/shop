import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import {
  DashboardGoalsRequest,
  DashboardGoalsResponse,
  DashboardResponse,
} from '../../app/api/apiTypes/dashboardGoalsApiTypes';
import { adminGoalsUrl } from '../../app/endpoints';

export const dashboardGoalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardGoals: builder.query<DashboardResponse, void>({
      query: () => adminGoalsUrl,
      providesTags: [TagTypesEnum.Goals],
    }),
    updateDashboardGoals: builder.mutation<
      DashboardGoalsResponse,
      DashboardGoalsRequest
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
  dashboardGoalsApiSlice;
