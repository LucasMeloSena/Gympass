import { User } from '@/hooks/useUser'

export const filterEmptyFields = (data: User): User => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  ) as User
}
