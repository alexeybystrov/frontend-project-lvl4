import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: '',
  reducers: {
    setCurrentChannelId: (state, { payload }) => payload.id,
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
