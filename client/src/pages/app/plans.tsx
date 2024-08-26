import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Card } from '@/components/plans/card'
import { AppDispatch, RootState } from '@/slices/store'
import { getSubscriptionStatusAsync } from '@/slices/subscriptionSlice'

export function Plans() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const isSubscriber = useSelector(
    (state: RootState) => state.subscription.isSubscriber,
  )

  useEffect(() => {
    dispatch(getSubscriptionStatusAsync())
  }, [dispatch])

  useEffect(() => {
    if (isSubscriber) {
      navigate('/dashboard')
    }
  }, [navigate, isSubscriber])

  return (
    <>
      <Helmet title="Planos" />

      <div className="flex h-full w-full flex-col items-center gap-14 p-10">
        <h1 className="font-poppins text-2xl font-semibold text-black">
          Confira os planos disponíveis no momento
        </h1>
        <Card />
      </div>
    </>
  )
}
