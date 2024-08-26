import dayjs from 'dayjs'
import { Helmet } from 'react-helmet-async'

import { columns } from '@/components/history/columns'
import { DataTable } from '@/components/history/data-table'
import { useGetUserCheckInHistory } from '@/hooks/useCheckIn'
import { useGetGyms } from '@/hooks/useGyms'
import { verifyStatus } from '@/lib/scripts/verify-check-in-status'

export enum CheckInStatus {
  AguardandoAprovação = 'Aguardando Aprovação',
  Aprovado = 'Aprovado',
  Expirado = 'Expirado',
}

export interface CheckInHistory {
  status: CheckInStatus
  date: string
  gym: string
}

export function History() {
  const { data: checkIns } = useGetUserCheckInHistory('/check-ins/history')
  const { data: gyms } = useGetGyms('/gyms/search', { query: '', page: 1 })

  if (!checkIns) return
  if (!gyms) return

  const gymsMap = new Map(gyms.map((gym) => [gym.id, gym]))

  const info = checkIns.map((checkIn) => {
    const gym = gymsMap.get(checkIn.gym_id)
    return {
      date: dayjs(checkIn.created_at).format('MMMM D, YYYY h:mm A').toString(),
      status: verifyStatus(checkIn.created_at, checkIn.validated_at),
      gym: gym ? gym.name : 'Desconhecida',
    }
  })

  return (
    <>
      <Helmet title="Histórico" />

      <div className="container mx-auto py-10">
        <h1 className="font-poppins text-xl font-semibold">
          Histórico de Check-Ins
        </h1>
        <DataTable columns={columns} data={info} />
      </div>
    </>
  )
}
