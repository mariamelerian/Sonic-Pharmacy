import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userId: "",
  name: "",
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "loginAdminPharm",
  initialState,
  reducers: {
    setCredentialsAdminPharm: (state, action) => {
      state.userName = action.payload.userName;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logoutAdminPharm: (state, action) => {
      state.userName = "";
      state.userId = "";
      state.name = "";
      state.isLoggedIn = false;
    },

    setUserIdAdmin: (state, action) => {
      state = {
        ...state,
        userId: action.payload.userId,
      };
    },
  },
});

export const { setCredentialsAdminPharm, logoutAdminPharm, setUserIdAdmin } =
  loginSlice.actions;
export default loginSlice.reducer;
