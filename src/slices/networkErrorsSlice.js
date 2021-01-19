import { createSlice } from '@reduxjs/toolkit';

const networkErrorsInitialState = { isOpened: false, text: '' };

const networkErrorsSlice = createSlice({
  name: 'networkErrorToast',
  initialState: networkErrorsInitialState,
  reducers: {
    showToast: (state, { payload }) => ({ isOpened: true, text: payload.message }),
    closeToast: () => networkErrorsInitialState,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(closeModal, () => networkErrorsInitialState);
  // },
});

export const { showToast, closeToast } = networkErrorsSlice.actions;
export default networkErrorsSlice.reducer;
