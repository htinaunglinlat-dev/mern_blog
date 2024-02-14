import userSlice from './slices/userSlice'
import countSlice from './slices/countSlice'
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
   user: userSlice,
   counter: countSlice
})

export default rootReducer;