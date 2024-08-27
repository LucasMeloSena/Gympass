import { Helmet } from 'react-helmet-async'

export function Home() {
  return (
    <>
      <Helmet title="Home" />
      
      <div className='grid grid-cols-2 items-center justify-center p-6'>
        <div className='flex flex-col'>
          <h1 className='font-poppins text-left font-semibold text-3xl'>MUDE SEU ESTILO DE VIDA HOJE
            MESMO COM A GYMSIGN!
          </h1>
          <h4 className='text-muted-foreground font-poppins text-sm'>
            Aqui você tem a oportunidade de ir a qualquer academia parceira próxima de você!
            Sem fidelidade e compromisso. Crie sua conta hoje mesmo! É grátis!!
          </h4>
        </div>
      </div>
    </>
  )
}
