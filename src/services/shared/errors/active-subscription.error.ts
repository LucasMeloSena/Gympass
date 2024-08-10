export class ActiveSubscriptionError extends Error {
  constructor() {
    super('Usuário já possui uma assinatura ativa para este produto.');
  }
}
