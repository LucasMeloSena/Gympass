import { useMutation, useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

import { env } from '@/env'
import { getErrorMessage, ServerError } from '@/lib/errors'
import { api } from '@/middlewares/interceptor-request'

export interface User {
  name: string
  email: string
  phone: string
  password: string | null
}

interface GetUser {
  name: string
  email: string
  phone: string
  created_at: string
}

interface Auth {
  email: string
  password: string
}

interface UpdatePass {
  email: string
  password: string
  token: string
}

interface ServerErrorResponse {
  code: ServerError
  message: string
}

const fetch = axios.create({
  baseURL: env.VITE_SERVER_URL,
})

const getUser = async (endpoint: string) => {
  const response = await api.get(endpoint)
  const { user } = response.data
  return user as GetUser
}

const postUser = async (endpoint: string, data: User) => {
  try {
    const response = await fetch.post(endpoint, data)
    return response.data
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>
    const errorCode = error.response?.data.code
    const message = getErrorMessage(errorCode)
    throw new Error(message)
  }
}

const forgotPassword = async (
  endpoint: string,
  email: string,
): Promise<string> => {
  try {
    const response = await fetch.post(endpoint, { email })
    return response.data.code
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>
    const errorCode = error.response?.data.code
    const message = getErrorMessage(errorCode)
    throw new Error(message)
  }
}

const updateUser = async (endpoint: string, data: User) => {
  try {
    const response = await fetch.patch(endpoint, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return response.data
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>
    const errorCode = error.response?.data.code
    const message = getErrorMessage(errorCode)
    throw new Error(message)
  }
}

const updateOnlyPass = async (endpoint: string, data: Auth) => {
  try {
    const response = await fetch.patch(endpoint, data)
    return response.data
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>
    const errorCode = error.response?.data.code
    const message = getErrorMessage(errorCode)
    throw new Error(message)
  }
}

const authenticateUser = async (
  endpoint: string,
  data: Auth,
): Promise<string> => {
  const response = await fetch.post(endpoint, data, { withCredentials: true })
  return response.data.token
}

export const useRegisterUser = (endpoint: string) => {
  return useMutation({
    mutationKey: ['post-user', endpoint],
    mutationFn: (data: User) => postUser(endpoint, data),
  })
}

export const useAuthenticateUser = (endpoint: string) => {
  return useMutation({
    mutationKey: ['authenticate-user', endpoint],
    mutationFn: (data: Auth) => authenticateUser(endpoint, data),
  })
}

export const useGetUser = (endpoint: string) => {
  return useQuery({
    queryKey: ['get-user', endpoint],
    queryFn: () => getUser(endpoint),
  })
}

export const useUpdateUser = (endpoint: string) => {
  return useMutation({
    mutationKey: ['update-user', endpoint],
    mutationFn: (data: User) => updateUser(endpoint, data),
  })
}

export const useForgotPass = (endpoint: string) => {
  return useMutation({
    mutationKey: ['user-forgot-password', endpoint],
    mutationFn: (email: string) => forgotPassword(endpoint, email),
  })
}

export const useUpdatePass = (endpoint: string) => {
  return useMutation({
    mutationKey: ['update-only-user-pass', endpoint],
    mutationFn: (data: UpdatePass) => updateOnlyPass(endpoint, data),
  })
}
