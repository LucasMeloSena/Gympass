import { Mail, Map, Phone } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { MakeCheckIn } from '@/components/make-check-in'
import { useGetGymById } from '@/hooks/useGyms'

export function GymInfo() {
  const { id } = useParams()
  if (!id) throw new Error()

  const { data, error } = useGetGymById('/gym', { id })
  if (error) {
    return toast.error(
      'Ocorreu um erro ao buscar pela academia. Tente novamente mais tarde.',
    )
  }

  const address = `${data?.street}, ${data?.adress_number} - ${data?.adress_addition} <br> ${data?.district}, ${data?.state}`

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={data?.image}
        alt={data?.name}
        className="mt-10 h-96 w-96 rounded-md shadow-intense"
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-poppins text-2xl font-semibold">{data?.name}</h1>
        <h4 className="font-poppins text-base text-muted-foreground">
          {data?.description}
        </h4>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex min-h-20 w-80 flex-row items-center justify-center gap-3 rounded-md border border-solid border-gray-200 bg-transparent p-4">
          <Map size={20} color="#DC7609" />
          <h6
            className="text-center font-poppins text-sm"
            dangerouslySetInnerHTML={{ __html: address }}
          ></h6>
        </div>
        <div className="flex h-20 w-80 flex-row items-center justify-center gap-3 rounded-md border border-solid border-gray-200 bg-transparent p-4">
          <Phone size={20} color="#DC7609" />
          <h6 className="text-center font-poppins text-sm">{data?.phone}</h6>
        </div>
      </div>
      <div className="flex h-20 w-80 flex-row items-center justify-center gap-3 rounded-md border border-solid border-gray-200 bg-transparent p-4">
        <Mail size={20} color="#DC7609" />
        <h6 className="text-center font-poppins text-sm">{data?.email}</h6>
      </div>

      <MakeCheckIn />
    </div>
  )
}
