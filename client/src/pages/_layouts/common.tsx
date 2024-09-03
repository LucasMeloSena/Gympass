import { Dumbbell } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function CommonLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex h-24 w-full flex-row items-center justify-start p-4">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Dumbbell className="h-5 w-5" />
          <span className="font-semibold">GymSign</span>
        </div>
        <div className="flex flex-grow flex-row justify-end gap-2">
          <Link to={'/sign-in'}>
            <Button>Login</Button>
          </Link>
          <Link to={'/sign-up'}>
            <Button>Cadastro</Button>
          </Link>
        </div>
      </header>

      <div className="flex-grow">
        <Outlet />
      </div>

      {/* <footer className="h-24 w-full bg-red-400"></footer> */}
    </div>
  )
}
