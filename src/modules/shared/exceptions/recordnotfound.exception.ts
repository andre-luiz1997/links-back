import { HttpException, HttpStatus } from '@nestjs/common';

export class RecordNotFoundException extends HttpException {
  constructor(message?: string) {
    super( message ?? 'recordNotFound', HttpStatus.NOT_FOUND);
  }
}
