import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useCreateCheckIn } from '@/hooks/useCheckIn'
import { getLocationAsync } from '@/slices/locationSlice'
import { AppDispatch, RootState } from '@/slices/store'

import { Button } from './ui/button'

export function MakeCheckIn() {
  const { id } = useParams()
  if (!id) throw new Error()

  const dispatch = useDispatch<AppDispatch>()
  const location = useSelector((state: RootState) => state.location)

  useEffect(() => {
    dispatch(getLocationAsync())
  }, [dispatch])

  const mutation = useCreateCheckIn(`/gyms/${id}/check-ins`)

  const handleClickMakeCheckIn = async () => {
    try {
      await mutation.mutateAsync(location)
      toast.success(
        'Seu check-in foi criado. Solicite sua validação na academia. Você tem um prazo de 20 minutos para isso. Acompanhe diretamente pelo painel do histórico',
      )
    } catch (err) {
      toast.warning((err as Error).message)
    }
  }

  return (
    <div className="mt-3">
      <Button type="button" onClick={handleClickMakeCheckIn}>
        Fazer Check-In
      </Button>
    </div>
  )
}
