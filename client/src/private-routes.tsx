import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'

import { env } from './env'
import { api } from './middlewares/interceptor-request'
import { RootState } from './slices/store'

interface PrivateRouteProps {
  element: ReactElement
}
export function PrivateRoute({ element }: PrivateRouteProps) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)

  return isAuth ? element : <Navigate to="/sign-in" />
}

export function SubscriberPrivateRoute({ element }: PrivateRouteProps) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
  const isSubscriber = useSelector(
    (state: RootState) => state.subscription.isSubscriber,
  )

  if (!isAuth) {
    return <Navigate to="/sign-in" />
  } else if (isAuth && !isSubscriber) {
    toast.warning(
      'Você precisa realizar o pagamento da assinatura para acessar os menus.',
    )
    verifyIfUrlIsFromStripeCheckOut()
    return <Navigate to="/plans" />
  } else if (isAuth && isSubscriber) {
    return element
  }
}

async function verifyIfUrlIsFromStripeCheckOut() {
  const url = window.location.href
  if (
    env.VITE_NODE_ENV === 'dev' &&
    url === 'http://localhost:5173/dashboard?redirect=stripe'
  ) {
    await api.get('/webhook-local')
  }
}
