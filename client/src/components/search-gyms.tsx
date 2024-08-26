import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useGetGyms } from '@/hooks/useGyms'

export function SearchGyms() {
  const { data, error } = useGetGyms('/gyms/search', {
    query: '',
    page: 1,
  })
  if (error) toast.error('Ocorreu um erro ao buscar por academias!')
  const navigate = useNavigate()

  function handleGymClick(id: string) {
    navigate(`/gym/${id}`)
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-poppins text-xl font-semibold text-white">
        Procure por uma academia
      </h1>
      <Command className="h-36">
        <CommandInput placeholder="Digite o nome de uma academia..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleGymClick(item.id)}
                  className="hover:cursor-pointer"
                >
                  {item.name}
                </CommandItem>
              ))
            ) : (
              <CommandItem>Nenhuma academia cadastrada.</CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
