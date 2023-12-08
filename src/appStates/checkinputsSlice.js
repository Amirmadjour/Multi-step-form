import { createSlice } from "@reduxjs/toolkit";

export const checkinputsSlice = createSlice({
  name: "checkinputs",
  initialState: {
    value: 0,
  },
  reducers: {
    handleCheckFields: (state, action) => {
      const inputArray = action.payload;
      if (!inputArray[0].trim()) {
        state.value = 1;
      } else if (!inputArray[1].trim()) {
        state.value = 2;
      } else if (!inputArray[2].trim()) {
        state.value = 3;
      } else {
        state.value = -1;
      }
    },
  },
});

export const { handleCheckFields } = checkinputsSlice.actions;
export const selectEmptyInput = (state) => state.checkinputs.value;

export default checkinputsSlice.reducer;
