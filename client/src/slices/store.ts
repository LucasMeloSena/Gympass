import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import locationReducer from './locationSlice'
import subscriptionSlice from './subscriptionSlice'

export const store = configureStore({
  reducer: {
    location: locationReducer,
    auth: authReducer,
    subscription: subscriptionSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
