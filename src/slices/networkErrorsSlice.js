import { createSlice } from '@reduxjs/toolkit';
import { closeModal } from './modalSlice.js';

const networkErrorsInitialState = '';

const networkErrorsSlice = createSlice({
  name: 'networkErrors',
  initialState: networkErrorsInitialState,
  reducers: {
    setNetworkErrors: (state, { payload }) => payload.message,
    clearNetworkErrors: () => networkErrorsInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(closeModal, () => networkErrorsInitialState);
  },
});

export const { setNetworkErrors, clearNetworkErrors } = networkErrorsSlice.actions;
export default networkErrorsSlice.reducer;
