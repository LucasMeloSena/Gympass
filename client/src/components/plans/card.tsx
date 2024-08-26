import { Oval } from 'react-loader-spinner'
import { toast } from 'sonner'

import { useOpenCheckOutPage } from '@/hooks/usePaymentCheckOut'

import { Button } from '../ui/button'
import { CardItem } from './card-item'

export function Card() {
  const mutation = useOpenCheckOutPage('/checkout')

  const handleClickSignButton = async () => {
    try {
      const { url } = await mutation.mutateAsync()

      window.location.assign(url)
    } catch (err) {
      toast.warning((err as Error).message)
    }
  }

  return (
    <>
      {mutation.isPending ? (
        <div className="flex h-full w-full items-center justify-center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#DC2626"
            secondaryColor="#DC2626"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex h-96 w-80 flex-col items-center gap-6 rounded-md p-6 shadow-intense">
          <h1 className="font-poppins text-lg font-semibold">Standart</h1>
          <h1 className="font-poppins text-3xl font-medium">R$30,00</h1>
          <div className="flex flex-grow flex-col gap-5">
            <CardItem
              text={'1 check-in por dia em qualquer academia parceira'}
            />
            <CardItem text={'Acesso à histórico'} />
            <CardItem text={'Acesso à relatórios'} />
            <CardItem text={'Filtro de academias próximas'} />
          </div>

          <Button className="font-poppins" onClick={handleClickSignButton}>
            Assinar
          </Button>
        </div>
      )}
    </>
  )
}
