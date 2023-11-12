import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  email: "",
  password: "",
  birthdate: "",
  gender: "",
  phoneNumber: "",
  emergencyName: "",
  emergencyNumber: "",
  emergencyRelation: "",
  wallet: "",
  userId: "",
  addresses: [],
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "loginPatient",
  initialState,
  reducers: {
    setCredentialsPatient: (state, action) => {
      state.password = action.payload.password;
      state.username = action.payload.username;
      state.birthdate = action.payload.birthdate;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.gender = action.payload.gender;
      state.phoneNumber = action.payload.phoneNumber;
      state.userId = action.payload.userId;
      state.emergencyName = action.payload.emergencyName;
      state.emergencyNumber = action.payload.emergencyNumber;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.wallet = action.payload.wallet;
      state.addresses = action.payload.addresses;
    },
    updatePatientWallet: (state, action) => {
      state.wallet = action.payload.wallet;
    },
    updatePatientAddresses: (state, action) => {
      state.addresses = [...state.addresses, ...action.payload.addresses];
    },
    logoutPatient: (state, action) => {
      state.username = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.birthdate = "";
      state.gender = "";
      state.phoneNumber = "";
      state.emergencyName = "";
      state.emergencyNumber = "";
      state.userId = "";
      state.wallet = "";
      state.addresses = [];
      state.isLoggedIn = false;
    },
    clearPassword: (state, action) => {
      state = {
        ...state,
        password: "",
      };
    },
    setUserId: (state, action) => {
      state = {
        ...state,
        userId: action.payload.userId,
      };
    },
  },
});

export const {
  setCredentialsPatient,
  updatePatientWallet,
  updatePatientAddresses,
  logoutPatient,
  clearPassword,
  setUserId,
} = loginSlice.actions;
export default loginSlice.reducer;
