import { BaseError } from './base-error'

export class NotFoundError extends BaseError {
  constructor(message = 'Not found', details?: unknown) {
    super(message, 404, 'NOT_FOUND', details)
  }
}
