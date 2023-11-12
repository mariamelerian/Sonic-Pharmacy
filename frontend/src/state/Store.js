import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import filterMedicine from "./filterMedicine";
import forgotEmail from "./forgotEmail";
import loginAdminReducer from "./loginAdminReducer";
import loginPatientReducer from "./loginPatientReducer";
import loginPharmacistReducer from "./loginPharmacistReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  filterMedicine: filterMedicine,
  adminLogin: loginAdminReducer,
  patientLogin: loginPatientReducer,
  pharmacistLogin: loginPharmacistReducer,
  forgotEmail: forgotEmail,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
