import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { CommonLayout } from './pages/_layouts/common'
import { Dashboard } from './pages/app/dashboard'
import { GymInfo } from './pages/app/gym'
import { History } from './pages/app/history'
import { Metrics } from './pages/app/metrics'
import { Plans } from './pages/app/plans'
import { ForgotPassword } from './pages/auth/forgot-password'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sing-up'
import { Home } from './pages/common/home'
import { PrivateRoute, SubscriberPrivateRoute } from './private-routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <SubscriberPrivateRoute element={<Dashboard />} />,
      },
      {
        path: '/history',
        element: <SubscriberPrivateRoute element={<History />} />,
      },
      {
        path: '/gym/:id',
        element: <SubscriberPrivateRoute element={<GymInfo />} />,
      },
      {
        path: '/metrics',
        element: <SubscriberPrivateRoute element={<Metrics />} />,
      },
      { path: '/plans', element: <PrivateRoute element={<Plans />} /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
      { path: '/forgot-pass', element: <ForgotPassword /> },
    ],
  },
])
