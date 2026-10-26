import apiSlice, { MethodsEnum, TagTypesEnum } from '../../app/api/apiSlice';
import {
  DashboardGoalsResponse,
  DashboardResponse,
} from '../../app/api/apiTypes/dashboardApiTypes';
import { adminGoalsUrl } from '../../app/endpoints';

export const dashboardGoalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardGoals: builder.query<DashboardResponse, void>({
      query: () => adminGoalsUrl,
      providesTags: [TagTypesEnum.Goals],
    }),
    updateDashboardGoals: builder.mutation<DashboardGoalsResponse, any>({
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
