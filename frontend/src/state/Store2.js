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
import notifications from "./notifications";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  filterMedicine: filterMedicine,
  adminPharmLogin: loginAdminReducer,
  patientPharmLogin: loginPatientReducer,
  pharmacistLogin: loginPharmacistReducer,
  forgotEmail: forgotEmail,
  newNotifications: notifications,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store2 = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store2;
