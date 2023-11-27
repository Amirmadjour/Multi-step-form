import { createSlice } from '@reduxjs/toolkit'

export const isCheckedSlice = createSlice({
  name: 'isChecked',
  initialState: {
    value:[false, false, false],
  },
  reducers: {
    toggleChecked: (state, action) => {
      const index = action.payload;
      state.value[index] = !state.value[index];
    }
  },
})

export const { toggleChecked } = isCheckedSlice.actions
export const selectedChecked = (state) => state.isChecked.value

export default isCheckedSlice.reducer