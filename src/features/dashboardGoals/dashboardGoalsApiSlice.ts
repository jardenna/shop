import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { DashboardGoalsResponse } from '../../app/api/apiTypes/dashboardApiTypes';
import { adminGoalsUrl } from '../../app/endpoints';

export const dashboardGoalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardGoals: builder.query<DashboardGoalsResponse, void>({
      query: () => adminGoalsUrl,
      providesTags: [TagTypesEnum.Goals],
    }),
  }),
});

export const { useGetDashboardGoalsQuery } = dashboardGoalsApiSlice;
