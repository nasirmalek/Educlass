import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  role: string;
  email: string;
  classId: string; // Add this line
}

interface AuthState {
  user: { id: string; role: string; email: string } | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: { id: string; role: string; email: string }; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setUser: (state, action: PayloadAction<{ user: { id: string; role: string; email: string }; token: string } | null>) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      } else {
        state.user = null;
        state.token = null;
      }
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;