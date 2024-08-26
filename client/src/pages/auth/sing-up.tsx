import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { z, ZodError } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRegisterUser } from '@/hooks/useUser'
import { ComparisonBetweenPasswordError } from '@/lib/errors/comparison-pass.error'
import { SmallPassError } from '@/lib/errors/small-pass.error'

const signUpForm = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  confirm_pass: z.string().min(6),
})
type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()
  const mutation = useRegisterUser('/users')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()
  const registerWithMask = useHookFormMask(register)

  async function handleSignUp(data: SignUpForm) {
    try {
      const phoneContent = data.phone.substring(5, 6)
      if (phoneContent !== '9') {
        const regex = /(\(31\)\s*[0-8])/g
        const resultado = data.phone.replace(regex, '(31) 9')
        data.phone = resultado
      }

      if (data.password !== data.confirm_pass) {
        throw new ComparisonBetweenPasswordError()
      }
      if (data.password.length < 6) {
        throw new SmallPassError()
      }
      signUpForm.parse(data)

      await mutation.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })

      toast.success('Cadastro realizado com sucesso!')
      navigate('/sign-in')
    } catch (err) {
      if (err instanceof ZodError) {
        return toast.error('Campos inválidos ou ausentes.')
      }
      toast.error((err as Error).message)
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild variant={'outline'} className="absolute right-8 top-8">
          <Link to="/sign-in">Login</Link>
        </Button>

        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar Conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Crie sua conta agora e comece a frequentar a <br /> academia
              parceira mais próxima de você hoje mesmo!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" {...register('name')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <Input
                id="phone"
                type="text"
                {...registerWithMask('phone', ['(99) [9] 9999-9999'])}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_pass">Confirmar Senha</Label>
              <Input
                id="confirm_pass"
                type="password"
                {...register('confirm_pass')}
              />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar Cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar você concorda com nossos <br />{' '}
              <a href="#" className="underline underline-offset-4">
                Termos de Serviço
              </a>{' '}
              e
              <a href="#" className="underline underline-offset-4">
                {' '}
                Políticas de Privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
