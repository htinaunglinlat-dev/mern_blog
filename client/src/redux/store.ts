import { configureStore } from '@reduxjs/toolkit'
import persistedReducer from './reducers'
import persistStore from 'redux-persist/es/persistStore'

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// persist 
export const persistor = persistStore(store)

