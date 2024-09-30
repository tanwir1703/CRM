import { createSlice } from '@reduxjs/toolkit';

// Initial state with default currency
const initialState = {
  currency: { symbol: '₹', code: 'INR' },
  currencies: [
    { symbol: '₹', code: 'INR' },
    { symbol: '$', code: 'USD' },
    { symbol: '¥', code: 'JPY' },
    { symbol: 'A$', code: 'AUD' },
    { symbol: 'C$', code: 'CAD' },
    { symbol: '€', code: 'EUR' },
    { symbol: 'CHF', code: 'CHF' },
  ],
};

// Create the slice
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = state.currencies.find(
        (currency) => currency.code === action.payload
      );
    },
  },
});

// Export actions and reducer
export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;