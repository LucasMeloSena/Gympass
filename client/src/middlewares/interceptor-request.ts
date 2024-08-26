import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { env } from '@/env'
import { cleanLocalStorage } from '@/lib/scripts/clean-local-storage'
import { logoutSuccess } from '@/slices/authSlice'
import { store } from '@/slices/store'
import { resetSubscriptionState } from '@/slices/subscriptionSlice'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  headers: {
    requiresAuth?: boolean
    [key: string]: any
  }
}

export const api = axios.create({
  baseURL: env.VITE_SERVER_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig
    const requiresAuth = error.config?.headers.Authorization

    if (requiresAuth && error.response && error.response.status === 401) {
      try {
        await refreshToken()
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return api(originalRequest)
      } catch (refreshError) {
        cleanLocalStorage()
        store.dispatch(resetSubscriptionState())
        store.dispatch(logoutSuccess())
        window.location.replace('/sign-in')
        console.error('Erro ao tentar atualizar o token:', refreshError)
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

const refreshToken = async () => {
  const response = await api.patch(`${env.VITE_SERVER_URL}/token/refresh`)
  if (response.status === 200) {
    localStorage.setItem('token', response.data.token)
  }
}
