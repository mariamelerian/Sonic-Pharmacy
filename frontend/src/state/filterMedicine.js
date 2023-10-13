import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  medicinalUse: "",
};

const filterMedicineSlice = createSlice({
  name: "medicineData",
  initialState,
  reducers: {
    setFilterArray: (state, action) => {
      state.medicinalUse = action.payload.medicinalUse;
    },
    deleteFilterArray: (state, action) => {
      state.medicinalUse = "";
    },
  },
});

export const { setFilterArray, deleteFilterArray } =
  filterMedicineSlice.actions;
export default filterMedicineSlice.reducer;
