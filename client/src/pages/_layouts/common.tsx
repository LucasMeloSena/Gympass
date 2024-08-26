import { Outlet } from 'react-router-dom'

export function CommonLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="h-24 w-full bg-red-400"></header>

      <div className="flex-grow">
        <Outlet />
      </div>

      <footer className="h-24 w-full bg-red-400"></footer>
    </div>
  )
}
