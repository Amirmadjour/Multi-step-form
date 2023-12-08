import { combineReducers } from '@reduxjs/toolkit'

import mo_yrReducer from '../src/appStates/mo_yrSlice'
import sumReducer from '../src/appStates/sumSlice'
import add_onsReducer from '../src/appStates/add_onsSlice'
import isCheckedReducer from '../src/appStates/isCheckedSlice'
import selectedButtonReducer from '../src/appStates/selectedButton'
import stepCounterReducer from '../src/appStates/step_counterSlice'
import form_submittedReducer from '../src/appStates/form_submitted'
import user_filledInputsReducer from '../src/appStates/user_filledInputs'
import checkinputsReducer from '../src/appStates/checkinputsSlice'

const rootReducer = combineReducers({
    mo_yr: mo_yrReducer,
    sum: sumReducer,
    add_ons: add_onsReducer,
    isChecked: isCheckedReducer,
    PlanType: selectedButtonReducer,
    step_counter: stepCounterReducer,
    form_submitted: form_submittedReducer,
    userfilledinputs: user_filledInputsReducer,
    checkinputs: checkinputsReducer,
});

export default rootReducer;