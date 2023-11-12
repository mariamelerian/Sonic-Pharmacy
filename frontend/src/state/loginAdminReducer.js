import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userId: "",
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "loginAdmin",
  initialState,
  reducers: {
    setCredentialsAdmin: (state, action) => {
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logoutAdmin: (state, action) => {
      state.userName = "";
      state.userId = "";
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

export const { setCredentialsAdmin, logoutAdmin, setUserIdAdmin } =
  loginSlice.actions;
export default loginSlice.reducer;
