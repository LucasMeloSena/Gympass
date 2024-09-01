import { Helmet } from 'react-helmet-async'

import ImgGym from '../../assets/img/gym.png'

export function Home() {
  return (
    <>
      <Helmet title="Home" />

      <div className="m-10 grid grid-cols-2 items-center justify-center rounded-lg bg-grayLight p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-left font-poppins text-3xl font-semibold">
            MUDE SEU ESTILO DE VIDA HOJE MESMO COM A GYMSIGN!
          </h1>
          <h4 className="font-poppins text-sm text-muted-foreground">
            Aqui você tem a oportunidade de ir a qualquer academia parceira
            próxima de você! Sem fidelidade e compromisso. Crie sua conta hoje
            mesmo! <b> É grátis!! </b>
          </h4>
        </div>
        <img src={ImgGym} />
      </div>
    </>
  )
}
