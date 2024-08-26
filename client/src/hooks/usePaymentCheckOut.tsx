import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { getErrorMessage, ServerError } from '@/lib/errors'
import { api } from '@/middlewares/interceptor-request'

interface ServerErrorResponse {
  code: ServerError
  message: string
}

interface OpenCheckOutPageResponse {
  url: string
}

const openCheckOutPage = async (
  endpoint: string,
): Promise<OpenCheckOutPageResponse> => {
  try {
    const response = await api.post(endpoint, null)
    return response.data
  } catch (err) {
    const error = err as AxiosError<ServerErrorResponse>
    const errorCode = error.response?.data.code
    const message = getErrorMessage(errorCode)
    throw new Error(message)
  }
}

export const useOpenCheckOutPage = (endpoint: string) => {
  return useMutation({
    mutationKey: ['open-payment-checkout', endpoint],
    mutationFn: () => openCheckOutPage(endpoint),
  })
}
