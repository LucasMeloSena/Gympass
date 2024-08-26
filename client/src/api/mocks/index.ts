import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { signInMock } from './sign-in-mock'
import { signUpMock } from './sign-up-mock'

export const worker = setupWorker(signInMock, signUpMock)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }
  await worker.start()
}
