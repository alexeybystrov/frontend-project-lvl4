import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = { isOpened: false, type: null, extra: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    openModal: (state, { payload }) => ({ isOpened: true, ...payload }),
    closeModal: () => modalInitialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
