import apiSlice, { TagTypesEnum } from '../../app/api/apiSlice';
import { TotalKpiResponse } from '../../app/api/apiTypes/dashboardApiTypes';
import { adminPeriodKpiUrl, adminTotalsKpiUrl } from '../../app/endpoints';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalKpi: builder.query<TotalKpiResponse, void>({
      query: () => adminTotalsKpiUrl,
    }),
    getPeriodKpi: builder.query<TotalKpiResponse, number>({
      query: (id) => `${adminPeriodKpiUrl}/${id}`,
      providesTags: [TagTypesEnum.Goals],
    }),
  }),
});

export const { useGetTotalKpiQuery, useGetPeriodKpiQuery } = dashboardApiSlice;
