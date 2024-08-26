import { useQuery } from '@tanstack/react-query'

import { api } from '@/middlewares/interceptor-request'

export interface SearchGyms {
  query: string
  page: number
}

export interface SearchNearbyGyms {
  latitude: number
  longitude: number
}

export interface SearchGymById {
  id: string
}

export interface Gym {
  id: string
  name: string
  image: string
  description: string | null
  email: string
  phone: string | null
  latitude: number
  longitude: number
  state: string
  city: string
  district: string
  street: string
  adress_number: string
  adress_addition: string | null
}

const getGyms = async (endpoint: string, data: SearchGyms): Promise<Gym[]> => {
  const response = await api.get(
    `${endpoint}?query=${data.query}&page=${data.page}`,
  )
  const { gyms } = response.data
  return gyms as Gym[]
}

const getNearbyGyms = async (
  endpoint: string,
  data: SearchNearbyGyms,
): Promise<Gym[]> => {
  const response = await api.get(
    `${endpoint}?latitude=${data.latitude}&longitude=${data.longitude}`,
  )
  const { gyms } = response.data
  return gyms as Gym[]
}

const getGymById = async (
  endpoint: string,
  data: SearchGymById,
): Promise<Gym> => {
  const response = await api.get(`${endpoint}/${data.id}`)
  const { gym } = response.data
  return gym as Gym
}

export const useGetGyms = (endpoint: string, data: SearchGyms) => {
  return useQuery({
    queryKey: ['get-gyms', endpoint],
    queryFn: () => getGyms(endpoint, data),
  })
}

export const useGetNearbyGyms = (endpoint: string, data: SearchNearbyGyms) => {
  return useQuery({
    queryKey: ['get-nearby-gyms', endpoint],
    queryFn: () => getNearbyGyms(endpoint, data),
    enabled: !!data,
  })
}

export const useGetGymById = (endpoint: string, data: SearchGymById) => {
  return useQuery({
    queryKey: [`get-gym-by-id-${data.id}`, endpoint],
    queryFn: () => getGymById(endpoint, data),
    enabled: !!data.id,
  })
}
