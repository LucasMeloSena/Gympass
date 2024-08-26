import { http, HttpResponse } from 'msw'

import { ServerError } from '@/lib/errors'

export interface SignUpBody {
  name: string
  email: string
  password: string
  phone: string
}

export const signUpMock = http.post<never, SignUpBody>(
  'http://localhost:3333/users',
  async ({ request }) => {
    const { name, email } = await request.json()

    if (name === 'John Doe') {
      return new HttpResponse(null, {
        status: 200,
      })
    }
    if (email === 'samemail@example.com') {
      return HttpResponse.json(
        {
          code: ServerError.UserAlreadyExists,
        },
        {
          status: 400,
        },
      )
    }

    return new HttpResponse(null, { status: 400 })
  },
)
