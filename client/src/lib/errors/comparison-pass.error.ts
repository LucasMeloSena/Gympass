export class ComparisonBetweenPasswordError extends Error {
  constructor() {
    super('As senhas não são iguais.')
  }
}
