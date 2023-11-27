import { createSlice } from '@reduxjs/toolkit'

export const selectedButtonSlice = createSlice({
  name: 'PlanType',
  initialState: {
    value: 'Arcade' 
  },
  reducers: {
    changeSelectedPlan: (state, action) => {
      state.value = action.payload;
    }, 
  },
})

export const { changeSelectedPlan } = selectedButtonSlice.actions
export const selectPlan = (state) => state.PlanType.value

export default selectedButtonSlice.reducer