import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { SecondeStepToRecoverPass } from '@/components/forgot-password/auth-code'
import { TryToRecoverPassWithEmail } from '@/components/forgot-password/email'
import { LastStepToRecoverPass } from '@/components/forgot-password/update-pass'
import { Button } from '@/components/ui/button'

export enum Component {
  email = 'email',
  authCode = 'auth-code',
  updatePass = 'update-pass',
}

export function ForgotPassword() {
  const [component, setComponent] = useState<Component>(Component.email)
  const [authCode, setAuthCode] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const changeComponent = (component: Component) => {
    setComponent(component)
  }

  const changeAuthCodeState = (authCode: string, email: string) => {
    setAuthCode(authCode)
    setEmail(email)
  }

  return (
    <>
      <Helmet title="Recuperar Senha" />

      <div className="w-96 p-8">
        <Button asChild variant={'outline'} className="absolute right-8 top-8">
          <Link to="/sign-in">Login</Link>
        </Button>

        {component === Component.email && (
          <TryToRecoverPassWithEmail
            onSuccess={changeComponent}
            onRecoverData={changeAuthCodeState}
          />
        )}
        {component === Component.authCode && (
          <SecondeStepToRecoverPass
            onSuccess={changeComponent}
            code={authCode}
          />
        )}
        {component === Component.updatePass && (
          <LastStepToRecoverPass email={email} />
        )}
      </div>
    </>
  )
}
