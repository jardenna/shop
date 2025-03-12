import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './../../app/store';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    selectedCurrency: 'DKK',
    rates: {} as Record<string, number>,
  },
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    setRates: (state, action) => {
      state.rates = action.payload;
    },
  },
});

export const selectCurrency = (state: RootState) => state.currency.rates;
export const { setCurrency, setRates } = currencySlice.actions;

export default currencySlice.reducer;
