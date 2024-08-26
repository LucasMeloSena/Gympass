export class SmallPassError extends Error {
  constructor() {
    super('A senha deve possuir no mínimo 6 caracteres.')
  }
}
