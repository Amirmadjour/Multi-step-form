import { createSlice } from "@reduxjs/toolkit";

export const userfilledinputsSlice = createSlice({
  name: "userfilledinputs",
  initialState: {
    value: ["", "", ""],
  },
  reducers: {
    handleInputChange: (state, action) => {
      const { name, value } = action.payload;
      if (name == "name") {
        state.value[0] = value;
      } else if (name == "email") {
        state.value[1] = value;
      } else {
        state.value[2] = value;
      }
    },
    handleCheckFields: () => {
      if (!formData.name.trim()) {
        setFilled(1);
      } else if (!formData.email.trim()) {
        setFilled(2);
      } else if (!formData.phone.trim()) {
        setFilled(3);
      } else {
        dispatch(handleNextStep());
      }
    },
  },
});

export const { handleInputChange } = userfilledinputsSlice.actions;
export const selectFilled = (state) => state.userfilledinputs.value;

export default userfilledinputsSlice.reducer;
