import { BaseError } from "./base-error";

export class BadRequest extends BaseError {
    constructor(message = 'Bad Request.', details?: unknown) {
        super(message, 400, 'BAD_REQUEST', details)
    }
}
