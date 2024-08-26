import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { getErrorMessage, ServerError } from '@/lib/errors'
import { api } from '@/middlewares/interceptor-request'

interface CheckInData {
  latitude: number
  longitude: number
}

export interface CheckIn {
  id: string
  created_at: Date
  validated_at: Date | null
  user_id: string
  gym_id: string
}

export interface CheckInMetrics {
  checkInsCount: number
  checkInsCountByMonth: {
    month: string
    count: number
  }[]
}

interface ServerErrorResponse {
  code: ServerError
  message: string
}

const createCheckIn = async (endpoint: string, data: CheckInData) => {
  try {
    await api.post(endpoint, data)
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>
    const errorCode = error.response?.data.code
    const message = getErrorMessage(errorCode)
    throw new Error(message)
  }
}

const searchUserCheckInHistory = async (
  endpoint: string,
): Promise<CheckIn[]> => {
  try {
    const response = await api.get(endpoint)
    const { checkIns } = response.data
    return checkIns as CheckIn[]
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>
    const errorCode = error.response?.data.code
    const message = getErrorMessage(errorCode)
    throw new Error(message)
  }
}

const searchUserCheckInMetrics = async (
  endpoint: string,
): Promise<CheckInMetrics> => {
  try {
    const response = await api.get(endpoint)
    const { checkInsCount, checkInsCountByMonth } = response.data
    return {
      checkInsCount,
      checkInsCountByMonth,
    }
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>
    const errorCode = error.response?.data.code
    const message = getErrorMessage(errorCode)
    throw new Error(message)
  }
}

export const useCreateCheckIn = (endpoint: string) => {
  return useMutation({
    mutationKey: ['create-check-in', endpoint],
    mutationFn: (data: CheckInData) => createCheckIn(endpoint, data),
  })
}

export const useGetUserCheckInHistory = (endpoint: string) => {
  return useQuery({
    queryKey: ['get-user-check-in-history', endpoint],
    queryFn: () => searchUserCheckInHistory(endpoint),
  })
}

export const useGetUserCheckInMetrics = (endpoint: string) => {
  return useQuery({
    queryKey: ['get-user-check-in-metrics', endpoint],
    queryFn: () => searchUserCheckInMetrics(endpoint),
  })
}
