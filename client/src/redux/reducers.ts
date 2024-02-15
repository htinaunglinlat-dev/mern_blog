import userReducer from './slices/userSlice'
import countReducer from './slices/countSlice'
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
   user: userReducer,
   counter: countReducer
})

const persistConfig = {
  key: "root",
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// console.log(persistedReducer)
export default persistedReducer;