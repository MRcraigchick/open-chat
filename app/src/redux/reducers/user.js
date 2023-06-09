import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    value: false,
  },
  reducers: {
    mountUser: (state, action) => {
      state.value = action.payload;
    },
    dismountUser: (state) => {
      state.value = false;
      state.favorites = [];
    },
  },
});

export const { mountUser, dismountUser } = user.actions;
export const selectUser = (state) => state.user.value;
export default user.reducer;
