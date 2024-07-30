export class LateCheckInValidateError extends Error {
  constructor() {
    super('The check-in can only be validate util 20 minutes of its creation.');
  }
}
