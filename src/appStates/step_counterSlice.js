import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 1,
}

export const step_counterSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    handleNextStep: state => {
      state.value += 1; 
    },
    handlePreviousStep: state => {
      state.value -= 1;
    },
    handleChange: state => {
      state.value -= 2;
    },
  },
})

export const { handleNextStep, handlePreviousStep, handleChange } = step_counterSlice.actions
export const selectStepCounter = (state) => state.step_counter.value
export default step_counterSlice.reducer