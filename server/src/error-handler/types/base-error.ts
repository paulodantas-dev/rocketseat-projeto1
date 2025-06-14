export class BaseError extends Error {
  public readonly statusCode: number
  public readonly errorCode?: string
  public readonly details?: unknown

  constructor(
    message: string,
    statusCode: number,
    errorCode?: string,
    details?: unknown,
  ) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.details = details

    Object.setPrototypeOf(this, new.target.prototype)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
