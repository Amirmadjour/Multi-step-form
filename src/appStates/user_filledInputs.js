import { createSlice } from '@reduxjs/toolkit'

export const userfilledinputsSlice = createSlice({
  name: 'userfilledinputs',
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

export const { } = userfilledinputsSlice.actions
export const selectFilled = (state) => state.userfilledinputsSlice.value

export default userfilledinputsSlice.reducer