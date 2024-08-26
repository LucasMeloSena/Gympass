import jwt from 'jsonwebtoken'

import { env } from '@/env'
import { Role } from '@/lib/constants'

interface JwtPayload {
  sub: string
  iat: number
  exp: number
  role: Role
}

export function isAuthenticated() {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const decoded = jwt.verify(token, env.VITE_JWT_SECRET) as JwtPayload
      return decoded.exp * 1000 > Date.now()
    } catch (e) {
      return false
    }
  }
  return false
}
