import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type PaginationState = {
  page: number;
  pageSize: number;
};

const initialState: PaginationState = {
  pageSize: 10,
  page: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    pageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    page: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { pageSize, page } = paginationSlice.actions;
export const selectPageSize = (state: RootState) => state.pagination.pageSize;
export default paginationSlice.reducer;
