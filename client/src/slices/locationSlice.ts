import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getCurrentLocation } from '@/lib/scripts/get-current-location'

export interface LocationState {
  latitude: number
  longitude: number
}

const initialState: LocationState = {
  latitude: 0,
  longitude: 0,
}

export const slice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocationAsync.fulfilled, (state, action) => {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    })
  },
})

export const getLocationAsync = createAsyncThunk(
  'location/getLocationAsync',
  async () => {
    const location = await getCurrentLocation()
    return location
  },
)

export default slice.reducer
