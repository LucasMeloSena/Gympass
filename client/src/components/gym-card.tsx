import { useNavigate } from 'react-router-dom'

import { Gym } from '@/hooks/useGyms'

interface GymCardData {
  gym: Gym
}

export function GymCard({ gym }: GymCardData) {
  const navigate = useNavigate()

  const handleClickGym = (id: string) => {
    navigate(`/gym/${id}`)
  }

  return (
    <>
      <div
        className="rounded-md bg-popover shadow-intense transition-all duration-300 hover:-translate-y-2 hover:cursor-pointer"
        onClick={() => handleClickGym(gym.id)}
      >
        <img src={gym.image} alt={gym.name} className="size-64 rounded-md" />
        <div className="m-1 p-1">
          <h6 className="text-center font-poppins text-sm">{gym.name}</h6>
          <h6 className="text-center font-poppins text-xs text-muted-foreground">
            {gym.district} - {gym.city}
          </h6>
        </div>
      </div>
    </>
  )
}
