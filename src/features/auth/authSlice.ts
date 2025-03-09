import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../app/api/apiTypes';
import { RootState } from '../../app/store';

interface AuthState {
  user: AuthResponse | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthResponse | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
