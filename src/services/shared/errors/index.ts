export enum ServerError {
  ZodValidationError = 'ZOD_VALIDATION_ERROR',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  LateCheckInValidade = 'LATE_CHECK_IN_VALIDATE',
  MaxCheckInsNumber = 'MAX_CHECK_INS_NUMBER',
  MaxDistanceForCheckIn = 'MAX_DISTANCE_FOR_CHECK_IN',
  MissingAuthHeader = 'MISSING_AUTH_HEADER',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  UserAlreadyExists = 'USER_ALREADY_EXISTS'
}