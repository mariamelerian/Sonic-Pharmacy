import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  email: "",
  birthdate: "",
  hourlyRate: 0,
  affiliation: "",
  education: "",
  documents: [],
  userId: "",
  photo: "",
  isLoggedIn: false,
  wallet: "",
};

const loginSlice = createSlice({
  name: "loginPharmacist",
  initialState,
  reducers: {
    setCredentialsPharmacist: (state, action) => {
      state.username = action.payload.username;
      state.birthdate = action.payload.birthdate;
      state.email = action.payload.email;
      state.hourlyRate = action.payload.hourlyRate;
      state.affiliation = action.payload.affiliation;
      state.education = action.payload.education;
      state.name = action.payload.name;
      state.documents = action.payload.documents;
      state.userId = action.payload.userId;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.photo = action.payload.photo;
      state.wallet = action.payload.wallet;
    },
    logoutPharmacist: (state, action) => {
      state.username = "";
      state.name = "";
      state.email = "";
      state.birthdate = "";
      state.hourlyRate = 0;
      state.affiliation = "";
      state.education = "";
      state.documents = [];
      state.userId = "";
      state.photo = "";
      state.isLoggedIn = false;
      state.wallet = "";
    },
    setUserIdPharmacist: (state, action) => {
      state = {
        ...state,
        userId: action.payload.userId,
      };
    },
  },
});

export const {
  setCredentialsPharmacist,
  logoutPharmacist,
  setUserIdPharmacist,
} = loginSlice.actions;
export default loginSlice.reducer;
