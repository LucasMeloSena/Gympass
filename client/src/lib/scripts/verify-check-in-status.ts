import dayjs from 'dayjs'

import { CheckInStatus } from '@/pages/app/history'

export function verifyStatus(
  createdAt: Date | undefined,
  validatedAt?: Date | null,
) {
  const pastTimeInMs = dayjs(new Date()).diff(createdAt)
  const maxTimeAllowedInMs = 1200000
  if (!validatedAt && pastTimeInMs > maxTimeAllowedInMs) {
    return CheckInStatus.Expirado
  } else if (!validatedAt) {
    return CheckInStatus.AguardandoAprovação
  } else if (validatedAt) {
    return CheckInStatus.Aprovado
  } else {
    return CheckInStatus.Expirado
  }
}
