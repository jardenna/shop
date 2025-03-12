import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './../../app/store';
import { CurrencyCode } from './currencyConverterUtil';
import { currencyCode } from './exchangeRatesApiSlice';

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    selectedCurrency: currencyCode,
    rates: {} as Record<CurrencyCode, number>,
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

export const selectCurrency = (state: RootState) => state.currency;
export const { setCurrency, setRates } = currencySlice.actions;

export default currencySlice.reducer;
