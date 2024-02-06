import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

type UserInfo = {
  username: string;
};

type AuthState = {
  isAuthenticated: boolean;
  token: string;
  user: UserInfo;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: "",
  user: {
    username: "",
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout() {
      return initialState;
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
};

export const persistedAuthReducer = persistReducer(
  persistConfig,
  authSlice.reducer
);

export const { login, logout } = authSlice.actions;

export default persistedAuthReducer;
