import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthenticateUser } from '@/hooks/useUser'
import { loginSuccess } from '@/slices/authSlice'
import { store } from '@/slices/store'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
export type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate()
  const mutation = useAuthenticateUser('/sessions')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      signInForm.parse(data)

      const result = await mutation.mutateAsync({
        email: data.email,
        password: data.password,
      })

      localStorage.setItem('token', result)
      store.dispatch(loginSuccess())

      toast.success('Autenticação realizada com sucesso!')
      navigate('/plans', { replace: true })
    } catch (err) {
      toast.error('Credenciais inválidas!')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="w-96 p-8">
        <Button asChild variant={'outline'} className="absolute right-8 top-8">
          <Link to="/sign-up">Cadastro</Link>
        </Button>

        <div className="flex w-full flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar App
            </h1>
            <p className="text-sm text-muted-foreground">
              Vá a uma academia agora mesmo!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>
            <div className="space-y-2">
              <a
                href="/forgot-pass"
                className="font-poppins text-sm text-muted-foreground underline underline-offset-4"
              >
                Esqueceu sua senha?
              </a>
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
