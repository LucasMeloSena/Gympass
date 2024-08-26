import { Link } from 'react-router-dom'

import { Button } from './ui/button'

type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>

interface AppMenuItem {
  icon: LucideIcon
  name: string
  route?: string
  handleClickMenuItem: (arg: string) => void
}

export function AppMenuItem({
  name,
  icon: Icon,
  route,
  handleClickMenuItem,
}: AppMenuItem) {
  const content = (
    <Button
      asChild
      className="w-full bg-popover transition-all duration-300 hover:cursor-pointer hover:bg-red-100"
      onClick={() => handleClickMenuItem(name)}
    >
      <div className="flex items-center gap-2 px-4 py-2">
        <Icon className="size-5 w-4 text-foreground" />
        <h4 className="text-foreground">{name}</h4>
      </div>
    </Button>
  )

  return <>{route ? <Link to={route}>{content}</Link> : <>{content}</>}</>
}
