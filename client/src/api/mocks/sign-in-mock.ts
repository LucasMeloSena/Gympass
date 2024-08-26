import { http, HttpResponse } from 'msw'

export interface SignInBody {
  email: string
  password: string
}

export const signInMock = http.post<never, SignInBody>(
  'http://localhost:3333/sessions',
  async ({ request }) => {
    const { email, password } = await request.json()

    if (email === 'johndoe@example.com' && password === '123456') {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'auth=sample-jwt',
        },
      })
    }

    return new HttpResponse(null, { status: 401 })
  },
)
