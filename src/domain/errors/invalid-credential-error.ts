export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais inv�lidas')
    this.name = 'InvalidCredentialError'
  }
}
