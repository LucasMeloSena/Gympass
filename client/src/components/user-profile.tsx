import dayjs from 'dayjs'
import { User as UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGetUser, User, useUpdateUser } from '@/hooks/useUser'
import { filterEmptyFields } from '@/lib/scripts/filter-empty-fields'

import { AppMenuItem } from './app-menu-item'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

export function UserProfile() {
  const { data, error } = useGetUser('/me')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<User>()
  const registerWithMask = useHookFormMask(register)
  const mutation = useUpdateUser('/update/user')

  async function handleUpdateUser(content: User) {
    try {
      if (!data) return
      if (
        content.name === '' &&
        content.phone === '' &&
        content.email === '' &&
        content.password === ''
      ) {
        setIsSheetOpen(false)
        return
      }
      const phoneContent = content.phone.substring(5, 6)
      if (phoneContent !== '9') {
        const regex = /(\(31\)\s*[0-8])/g
        const resultado = content.phone.replace(regex, '(31) 9')
        content.phone = resultado
      }

      content = filterEmptyFields(content)

      await mutation.mutateAsync(content)

      toast.success('Atualização realizada com sucesso!')
      setIsSheetOpen(false)
      reset()
    } catch (err) {
      toast.warning((err as Error).message)
    }
  }

  if (error) {
    return toast.error(
      'Ocorreu um erro ao buscar pelo seu usuário. Por favor, tente novamente.',
    )
  }
  const handleClickMenuItem = (_: string) => {}

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <AppMenuItem
          name={'Perfil'}
          icon={UserIcon}
          handleClickMenuItem={handleClickMenuItem}
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Perfil</SheetTitle>
          <SheetDescription>
            Atualize os dados do seu perfil quando julgar necessário. Ao
            terminar clique em salvar
          </SheetDescription>
        </SheetHeader>
        <p className="mb-2 mt-4 text-sm text-muted-foreground">
          Nosso usuário desde de{' '}
          {dayjs(data?.created_at).format('DD/MM/YYYY').toString()} <br />
          Obrigado pela confiança 😍
        </p>

        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              placeholder={data?.name}
              className="col-span-3"
              {...register('name')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Celular
            </Label>
            <Input
              id="phone"
              placeholder={data?.phone}
              className="col-span-3"
              {...registerWithMask('phone', ['(99) [9] 9999-9999'])}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder={data?.email}
              className="col-span-3"
              {...register('email')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Senha
            </Label>
            <Input
              id="password"
              className="col-span-3"
              type="password"
              {...register('password')}
            />
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
