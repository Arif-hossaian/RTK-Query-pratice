import { createSlice } from '@reduxjs/toolkit';
const initialState = [
  { id: '1', name: 'Arif' },
  { id: '2', name: 'Jon' },
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default userSlice.reducer;
