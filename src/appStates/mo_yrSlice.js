import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const mo_yrSlice = createSlice({
  name: 'mo_yr',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
})

export const { toggle } = mo_yrSlice.actions
export const selectToggled = (state) => state.mo_yr.value

export default mo_yrSlice.reducer