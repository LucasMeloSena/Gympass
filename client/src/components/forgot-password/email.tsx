import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z, ZodError } from 'zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForgotPass } from '@/hooks/useUser'
import { Component } from '@/pages/auth/forgot-password'

import { Button } from '../ui/button'

interface EmailProps {
  onSuccess(component: Component): void
  onRecoverData(code: string, email: string): void
}

const forgotPassForm = z.object({
  email: z.string().email(),
})
type ForgotPassForm = z.infer<typeof forgotPassForm>

export function TryToRecoverPassWithEmail({
  onSuccess,
  onRecoverData,
}: EmailProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ForgotPassForm>()
  const mutation = useForgotPass('/forgot-pass')

  const handleRecoverPass = async (data: ForgotPassForm) => {
    try {
      forgotPassForm.parse(data)
      const code = await mutation.mutateAsync(data.email)
      onRecoverData(code, data.email)
      onSuccess(Component.authCode)
    } catch (err) {
      if (err instanceof ZodError) {
        return toast.error('E-mail inválido ou ausente.')
      }
      toast.warning('E-mail não cadastrado como usuário do Gymsign.')
    }
  }

  return (
    <div className="flex w-full flex-col justify-center gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Recuperar Senha
        </h1>
        <p className="text-sm text-muted-foreground">
          Digite seu email abaixo para recuperar sua senha.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleRecoverPass)}>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" {...register('email')} />
        </div>
        <Button disabled={isSubmitting} className="w-full" type="submit">
          Recuperar Senha
        </Button>
      </form>
    </div>
  )
}
