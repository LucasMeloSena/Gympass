import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

import { GymCard } from '@/components/gym-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetNearbyGyms } from '@/hooks/useGyms'
import { getLocationAsync } from '@/slices/locationSlice'
import { AppDispatch, RootState } from '@/slices/store'

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const location = useSelector((state: RootState) => state.location)

  useEffect(() => {
    dispatch(getLocationAsync())
  }, [dispatch])

  const { data, error, isLoading } = useGetNearbyGyms(
    location.latitude !== 0 && location.longitude !== 0 ? '/gyms/nearby' : '',
    location,
  )

  if (isLoading) {
    const items = []
    for (let i = 0; i < 3; i++) {
      items.push(
        <div className="flex flex-col space-y-3 p-10" key={i}>
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>,
      )
    }

    return <div className="mt-24 flex flex-row">{items}</div>
  }
  if (error) toast.error('Ocorreu um erro ao buscar por academias próximas!')

  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex h-screen w-full flex-col items-start justify-start gap-10 bg-secondary p-10">
        <h1 className="font-poppins text-2xl font-semibold">
          Academias próximas
        </h1>
        <div className="flex flex-row flex-wrap items-center justify-center gap-5">
          {data && data.length > 0 ? (
            data.map((gym, index) => <GymCard key={index} gym={gym} />)
          ) : (
            <h1>Nenhuma academia próxima encontrada!</h1>
          )}
        </div>
      </div>
    </>
  )
}
