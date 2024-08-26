export enum ServerError {
  ZodValidationError = 'ZOD_VALIDATION_ERROR',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  LateCheckInValidade = 'LATE_CHECK_IN_VALIDATE',
  MaxCheckInsNumber = 'MAX_CHECK_INS_NUMBER',
  MaxDistanceForCheckIn = 'MAX_DISTANCE_FOR_CHECK_IN',
  MissingAuthHeader = 'MISSING_AUTH_HEADER',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  CheckOutSessionError = 'CHECK_OUT_SESSION_ERROR',
  ActiveSubscription = 'ACTIVE_SUBSCRIPTION',
}

export const errorMessage = {
  MAX_CHECK_INS: 'Você só pode realizar um check-in por dia.',
  MAX_DISTANCE:
    'Você não está dentro da distância permitida para realizar check-in. Você deve se aproximar no mínimo 500m.',
  ZOD_VALIDATION_ERROR: 'Campos inválidos ou ausentes.',
  USER_ALREADY_EXISTS:
    'Já existe um usuário cadastrado com as credenciais fornecidas.',
  CHECK_OUT_SESSION_ERROR:
    'Ocorreu um erro ao tentar estabelecer uma conexão com o servidor de pagamentos.',
  ACTIVE_SUBSCRIPTION:
    'Seu usuário já possui uma assinatura ativa para este produto.',
  GENERIC: 'Ocorreu um erro. Por favor, tente novamente.',
}

export const getErrorMessage = (code?: ServerError) => {
  switch (code) {
    case ServerError.MaxCheckInsNumber:
      return errorMessage.MAX_CHECK_INS
    case ServerError.MaxDistanceForCheckIn:
      return errorMessage.MAX_DISTANCE
    case ServerError.ZodValidationError:
      return errorMessage.ZOD_VALIDATION_ERROR
    case ServerError.UserAlreadyExists:
      return errorMessage.USER_ALREADY_EXISTS
    case ServerError.CheckOutSessionError:
      return errorMessage.CHECK_OUT_SESSION_ERROR
    case ServerError.ActiveSubscription:
      return errorMessage.ACTIVE_SUBSCRIPTION
    default:
      return errorMessage.GENERIC
  }
}
