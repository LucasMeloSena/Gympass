import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Component } from '@/pages/auth/forgot-password'

interface AuthCodeProps {
  onSuccess(component: Component): void
  code: string
}

export function SecondeStepToRecoverPass({ onSuccess, code }: AuthCodeProps) {
  const [value, setValue] = useState<string>('')

  const checkIfCodeIsOk = useCallback(
    (userCode: string, originalCode: string) => {
      const originalCodeFormatted = originalCode.replace(/\s+/g, '')
      if (userCode !== originalCodeFormatted) {
        toast.warning('O código digitado está incorreto!')
        setValue('')
      } else {
        onSuccess(Component.updatePass)
      }
    },
    [onSuccess],
  )

  useEffect(() => {
    if (value.length === 6) {
      checkIfCodeIsOk(value, code)
    }
  }, [value, code, checkIfCodeIsOk])

  return (
    <div className="flex w-full flex-col justify-center gap-6">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verifique seu e-mail!
        </h1>
        <p className="text-sm text-muted-foreground">
          Enviamos um código para seu email. Por favor, verifique e insira-o
          abaixo para recuperar sua senha.
        </p>
        <div className="space-y-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </div>
  )
}
