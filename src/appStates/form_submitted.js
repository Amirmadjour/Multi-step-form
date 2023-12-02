import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const form_submittedSlice = createSlice({
  name: "form_submitted",
  initialState,
  reducers: {
    submit_form: (state) => {
      state.value = !state.value;
    },
    setSbm: (state) => {
      state.value = false;
    },
  },
});

export const { submit_form, setSbm } = form_submittedSlice.actions;
export const selectFormSubmission = (state) => state.form_submitted.value;

export default form_submittedSlice.reducer;
