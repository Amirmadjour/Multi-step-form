import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const sumSlice = createSlice({
  name: 'sum',
  initialState,
  reducers: {
    addSum: (state, action) => {
      state.value += action.payload;
    },
    setSum: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { addSum, setSum } = sumSlice.actions
export const selectSum = (state) => state.sum.value
export default sumSlice.reducer