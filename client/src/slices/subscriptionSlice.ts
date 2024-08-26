import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '@/middlewares/interceptor-request'

export interface SubscriptionState {
  isSubscriber: boolean
}

const initialState: SubscriptionState = {
  isSubscriber: false,
}

export const slice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    resetSubscriptionState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionStatusAsync.fulfilled, (state, action) => {
        state.isSubscriber = action.payload
        localStorage.setItem('isSubscriber', action.payload)
      })
      .addCase(getSubscriptionStatusAsync.rejected, (state) => {
        state.isSubscriber = false
        localStorage.setItem('isSubscriber', 'false')
      })
  },
})

export const getSubscriptionStatusAsync = createAsyncThunk(
  'subscription/getSubscriptionStatusAsync',
  async () => {
    const response = await api.get('/subscription/verify-status')
    return response.data.isValid
  },
)

export default slice.reducer
export const { resetSubscriptionState } = slice.actions
