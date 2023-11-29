import { configureStore } from '@reduxjs/toolkit'
import mo_yrReducer from '../src/appStates/mo_yrSlice'
import sumReducer from '../src/appStates/sumSlice'
import add_onsReducer from '../src/appStates/add_onsSlice'
import isCheckedReducer from '../src/appStates/isCheckedSlice'
import selectedButtonReducer from '../src/appStates/selectedButton'
import stepCounterReducer from '../src/appStates/step_counterSlice'

export const store = configureStore({
  reducer: {
    mo_yr: mo_yrReducer,
    sum: sumReducer,
    add_ons: add_onsReducer,
    isChecked: isCheckedReducer,
    PlanType: selectedButtonReducer,
    step_counter: stepCounterReducer,
  },
})