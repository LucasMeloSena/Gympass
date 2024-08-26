import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z, ZodError } from 'zod'

import { env } from '@/env'
import { useUpdatePass } from '@/hooks/useUser'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface UpdatePassProps {
  email: string
}

const newPassForm = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})
type NewPassForm = z.infer<typeof newPassForm>

export function LastStepToRecoverPass({ email }: UpdatePassProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<NewPassForm>()
  const mutation = useUpdatePass('/update/user/pass')
  const navigate = useNavigate()

  const handleUpdatePass = async (data: NewPassForm) => {
    try {
      newPassForm.parse(data)
      if (data.password !== data.confirmPassword) {
        return toast.warning('As senhas não são iguais.')
      }

      await mutation.mutateAsync({
        email,
        password: data.password,
        token: env.VITE_PASSWORD_SECRET,
      })
      toast.success('Senha atualizada com sucesso!')
      navigate('/sign-in')
    } catch (err) {
      if (err instanceof ZodError) {
        return toast.error('A senha deve possuir no mínimo 6 caracteres.')
      }
      toast.warning('Campos ausentes.')
    }
  }

  return (
    <div className="flex w-full flex-col justify-center gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Criar Nova Senha
        </h1>
        <p className="text-sm text-muted-foreground">
          Crie uma nova senha para a sua conta.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleUpdatePass)}>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register('password')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
        </div>
        <Button disabled={isSubmitting} className="w-full" type="submit">
          Salvar
        </Button>
      </form>
    </div>
  )
}
