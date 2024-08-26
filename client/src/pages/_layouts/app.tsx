import {
  CreditCard,
  Dumbbell,
  FolderClock,
  LogOut,
  MousePointer2,
} from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'sonner'

import { AppMenuItem } from '@/components/app-menu-item'
import { SearchGyms } from '@/components/search-gyms'
import { UserProfile } from '@/components/user-profile'
import { cleanLocalStorage } from '@/lib/scripts/clean-local-storage'
import { logoutSuccess } from '@/slices/authSlice'
import { store } from '@/slices/store'
import { resetSubscriptionState } from '@/slices/subscriptionSlice'

export function AppLayout() {
  const menuItems = [
    { name: 'Histórico', icon: FolderClock, route: '/history' },
    { name: 'Métricas', icon: MousePointer2, route: '/metrics' },
    { name: 'Assinatura', icon: CreditCard },
    { name: 'Logout', icon: LogOut, route: '/sign-in' },
  ]

  const handleClickMenuItem = (menu: string) => {
    if (menu === 'Logout') {
      cleanLocalStorage()
      store.dispatch(resetSubscriptionState())
      store.dispatch(logoutSuccess())
      toast.success('Logout realizado com sucesso!')
    } else if (menu === 'Assinatura') {
      const subscriptionLink =
        'https://billing.stripe.com/p/login/test_dR64j705obtt2fCfYY'
      window.open(subscriptionLink)
    }
  }

  return (
    <div className="grid grid-cols-[400px,1fr]">
      <nav className="flex h-screen flex-col gap-10 bg-destructive p-10">
        <Link to={'dashboard'}>
          <Dumbbell color="white" size={36} />
        </Link>
        <SearchGyms />
        <div className="flex flex-col gap-5">
          <h1 className="font-poppins text-xl font-semibold text-white">
            Opções
          </h1>
          <UserProfile />
          {menuItems.map((item, index) => (
            <AppMenuItem
              key={index}
              name={item.name}
              icon={item.icon}
              route={item.route}
              handleClickMenuItem={handleClickMenuItem}
            />
          ))}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
