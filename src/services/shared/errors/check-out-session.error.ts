export class CheckOutSessionError extends Error {
  constructor() {
    super('Ocorreu um erro ao tentar estabelecer uma conexão com o servidor de pagamentos.');
  }
}
