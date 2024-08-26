import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: !!localStorage.getItem('isAuthenticated'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true
      localStorage.setItem('isAuthenticated', 'true')
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false
      localStorage.removeItem('isAuthenticated')
    },
  },
})

export const { loginSuccess, logoutSuccess } = authSlice.actions
export default authSlice.reducer
