import { createSlice } from '@reduxjs/toolkit'

export const add_onsSlice = createSlice({
  name: 'add_ons',
  initialState: {
    value:[],
  },
  reducers: {
    addAddon: (state, action) => {
      const {title, price} = action.payload;
      if(!state.value.some(addon => addon.title === title)) {
        state.value.push({title, price});
      }
    },
    removeAddon: (state, action) => {
      const {title} = action.payload;
      if(state.value.some(addon => addon.title === title)){
        state.value = state.value.filter(item => item.title !== title);
      }
    },
    replacePrice: (state, action) => {
      const {title, price} = action.payload;
      const indexToModify = state.value.findIndex(item => item.title === title);
      if(indexToModify !== -1) {
        state.value[indexToModify].price = price;
      }
    },
  },
})

export const { addAddon, removeAddon, replacePrice} = add_onsSlice.actions
export const selectedAddon = (state) => state.add_ons.value

export default add_onsSlice.reducer