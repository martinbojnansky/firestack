import { ActionErrors } from '@api/errors';
import { UnprocessableEntityException } from '@nestjs/common';

export class ActionError extends UnprocessableEntityException {
  private readonly errors = [];

  static of<T extends keyof ActionErrors>(key: T, args: ActionErrors[T]) {
    const error = new ActionError();
    error.and(key, args);
    return error;
  }

  and<T extends keyof ActionErrors>(key: T, args: ActionErrors[T]) {
    this.errors.push({ [key]: args });
    return this;
  }

  getResponse(): string | object {
    return this.errors;
  }
}
